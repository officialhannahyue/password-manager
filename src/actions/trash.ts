"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "./auth"
import { CredentialState } from "@/types/credentials"

export async function trashCredential(
    id: string
): Promise<CredentialState> {
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
            isTrashed: true,
        },
    })

    revalidatePath("/dashboard")

    return {
        success: true,
        message: "Credential moved to trash.",
    }
}

export async function deleteCredential(
    id: string
): Promise<CredentialState> {
    const user = await getCurrentUser()

    if (!user) {
        return {
            success: false,
            error: "User not authenticated.",
        }
    }
    if (user.isDemo) {
        return {
            success: false,
            error: "Permanent deletion is disabled in demo mode.",
        }
    }
    const credential = await prisma.credential.findFirst({
        where: {
            id,
            userId: user.id,
            isTrashed: true,
        },
    })

    if (!credential) {
        return {
            success: false,
            error: "Credential not found.",
        }
    }

    await prisma.credential.delete({
        where: {
            id: credential.id,
        },
    })

    revalidatePath("/trash")

    return {
        success: true,
        message: "Credential permanently deleted.",
    }
}

export async function restoreCredential(
    id: string
): Promise<CredentialState> {
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
            isTrashed: true,
        },
    })

    if (!credential) {
        return {
            success: false,
            error: "Credential not found in trash.",
        }
    }

    await prisma.credential.update({
        where: {
            id: credential.id,
        },
        data: {
            isTrashed: false,
        },
    })

    revalidatePath("/trash")
    revalidatePath("/dashboard")

    return {
        success: true,
        message: "Credential restored.",
    }
}