"use server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs";
import { getCurrentUser } from "./auth";
import { capitalize } from "@/lib/format";
import { revalidatePath } from "next/cache"
import { decrypt, encrypt } from "@/lib/encryption";
import { CredentialState } from "@/types/credentials";
import { revealPasswordRateLimit } from "@/lib/ratelimit"

export async function toggleFavorite(id: string) {
    const user = await getCurrentUser()

    if (!user) {
        return {
            success: false,
            error: "User not authenticated.",
        }
    }

    const credential = await prisma.credential.findFirst({
        where: {
            id,
            userId: user.id,
            isTrashed: false,
        },
    })

    if (!credential) {
        return {
            success: false,
            error: "Credential not found.",
        }
    }

    await prisma.credential.update({
        where: {
            id: credential.id,
        },
        data: {
            isFavorite: !credential.isFavorite,
        },
    })

    revalidatePath("/dashboard")

    return {
        success: true,
        isFavorite: !credential.isFavorite,
    }
}


export async function createCredential(
    previousState: CredentialState,
    formData: FormData
): Promise<CredentialState> {
    const user = await getCurrentUser();
    if (!user) {
        return {
            success: false,
            error: "User not authenticated."
        }
    };
    if (user.isDemo) {
        return {
            success: false,
            error: "Demo mode is read-only for adding credentials.",
        }
    }
    const rawName = formData.get("name")?.toString().trim();
    const url = formData.get("url")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const name = rawName ? capitalize(rawName) : undefined;
    if (
        typeof name !== "string" ||
        typeof url !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return {
            success: false,
            error: "Invalid Form Data"
        }
    };
    const encryptedPassword = encrypt(password);
    await prisma.credential.create({
        data: {
        userId: user.id,
        name,
        url,
        email,
        encryptedPassword,
    },
    })
    return {
        success: true,
        message: "Credential created successfully."
    }
}
type RevealPasswordResult =
    | {
        success: true
        password: string
    }
    | {
        success: false
        error: string
    }


export async function revealCredentialPassword(
    id: string
): Promise<RevealPasswordResult> {
    const user = await getCurrentUser()

    if (!user) {
        return {
            success: false,
            error: "User not authenticated.",
        }
    }

    const { success } = await revealPasswordRateLimit.limit(user.id)

    if (!success) {
        return {
            success: false,
            error: "Too many password reveal attempts. Please try again later.",
        }
    }

    const credential = await prisma.credential.findFirst({
        where: {
            id,
            userId: user.id,
            isTrashed: false,
        },
        select: {
            encryptedPassword: true,
        },
    })

    if (!credential) {
        return {
            success: false,
            error: "Credential not found.",
        }
    }

    if (!credential.encryptedPassword) {
        return {
            success: false,
            error: "Password not available.",
        }
    }

    try {
        const password = decrypt(credential.encryptedPassword)

        return {
            success: true,
            password,
        }
    } catch {
        return {
            success: false,
            error: "Unable to decrypt password.",
        }
    }
}