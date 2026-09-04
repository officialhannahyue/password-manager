"use server"

import prisma from "@/lib/prisma"
import { createSession } from "@/lib/session"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
    signupRateLimit,
    loginRateLimit,
    demoLoginRateLimit,
} from "@/lib/ratelimit"

export type AuthState = {
    success: boolean
    message?: string
    error?: string
}

interface UserProps {
    name: string
    email: string
    hashedPassword: string
}

export async function SignUp(
    previousState: AuthState,
    formData: FormData
): Promise<AuthState> {

    const email = formData.get("email")

    if (typeof email !== "string") {
        return {
            success: false,
            error: "Invalid Form Data",
        }
    }

    // Rate limit signup attempts
    const { success } = await signupRateLimit.limit(
        email.toLowerCase().trim()
    )

    if (!success) {
        return {
            success: false,
            error: "Too many signup attempts. Please try again later.",
        }
    }

    const name = formData.get("name")
    const password = formData.get("password")
    const passwordConfirm = formData.get("passwordConfirm")

    if (
        typeof name !== "string" ||
        typeof password !== "string" ||
        typeof passwordConfirm !== "string"
    ) {
        return {
            success: false,
            error: "Invalid Form Data",
        }
    }

    if (password !== passwordConfirm) {
        return {
            success: false,
            error: "Passwords don't match.",
        }
    }

    const normalizedEmail = email.toLowerCase().trim()

    const userExists = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    })

    if (userExists) {
        return {
            success: false,
            error: "User already exists. Please login.",
        }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user: UserProps = {
        name: name.trim(),
        email: normalizedEmail,
        hashedPassword,
    }

    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            passwordHash: user.hashedPassword,
        },
    })

    return {
        success: true,
        message: "Account created successfully",
    }
}


export async function Login(
    previousState: AuthState,
    formData: FormData
): Promise<AuthState> {

    const email = formData.get("email")
    const password = formData.get("password")

    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return {
            success: false,
            error: "Invalid Form Data",
        }
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Rate limit BEFORE checking the password
    const { success } = await loginRateLimit.limit(
        normalizedEmail
    )

    if (!success) {
        return {
            success: false,
            error: "Too many login attempts. Please try again later.",
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    })

    if (!user) {
        return {
            success: false,
            error: "User doesn't exist. Please signup.",
        }
    }

    const valid = await bcrypt.compare(
        password,
        user.passwordHash
    )

    if (!valid) {
        return {
            success: false,
            error: "Wrong password or email.",
        }
    }

    await createSession(user.id)

    redirect("/welcome")
}


export async function getCurrentUser() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session")?.value

    if (!sessionId) {
        return null
    }

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
        include: {
            user: true,
        },
    })

    if (!session) {
        cookieStore.delete("session")
        return null
    }

    if (session.expiresAt <= new Date()) {
        await prisma.session.delete({
            where: {
                id: sessionId,
            },
        })

        cookieStore.delete("session")

        return null
    }

    return session.user
}


export async function logout() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session")?.value

    if (!sessionId) {
        return {
            success: false,
            error: "No active session.",
        }
    }

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
    })

    if (!session) {
        cookieStore.delete("session")

        return {
            success: false,
            error: "Session not found.",
        }
    }

    await prisma.session.delete({
        where: {
            id: sessionId,
        },
    })

    cookieStore.delete("session")

    return {
        success: true,
        message: "Logged Out Successfully",
    }
}


// Demo user
export async function loginAsDemo() {

    const { success } = await demoLoginRateLimit.limit(
        "demo-user"
    )

    if (!success) {
        return {
            success: false,
            error: "Too many demo login attempts. Please try again later.",
        }
    }

    const demoUser = await prisma.user.findUnique({
        where: {
            email: "demo@example.com",
        },
    })

    if (!demoUser) {
        throw new Error("Demo account not configured")
    }

    await createSession(demoUser.id)

    redirect("/dashboard")
}