import { cookies } from "next/headers";
import prisma from "./prisma";

export async function createSession(userId: string) {
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date(
        Date.now() + (1000 * 60 * 60 * 24 * 30), //30 Day
    );
    const session = await prisma.session.create({
        data: {
            id: sessionId,
            userId,
            expiresAt,
        }
    })
    const cookieStore = await cookies();
    cookieStore.set("session", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    });
    return session
}