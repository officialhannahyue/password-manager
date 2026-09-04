import { encrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

const mockCredentials = [
    {
        name: "GitHub",
        url: "https://github.com",
        email: "demo-user@example.com",
        password: "GitHubDemo@2026!",
        isFavorite: true,
    },
    {
        name: "Google",
        url: "https://google.com",
        email: "demo-user@example.com",
        password: "GoogleDemo@2026!",
        isFavorite: true,
    },
    {
        name: "Figma",
        url: "https://figma.com",
        email: "demo-user@example.com",
        password: "FigmaDemo@2026!",
        isFavorite: true,
    },
    {
        name: "Discord",
        url: "https://discord.com",
        email: "demo-user@example.com",
        password: "DiscordDemo@2026!",
        isFavorite: false,
    },
    {
        name: "Notion",
        url: "https://notion.so",
        email: "demo-user@example.com",
        password: "NotionDemo@2026!",
        notes: "Demo workspace",
        isFavorite: false,
    },
    {
        name: "Vercel",
        url: "https://vercel.com",
        email: "demo-user@example.com",
        password: "VercelDemo@2026!",
        isFavorite: false,
    },
    {
        name: "Spotify",
        url: "https://spotify.com",
        email: "demo-user@example.com",
        password: "SpotifyDemo@2026!",
        isFavorite: false,
    },
    {
        name: "Amazon",
        url: "https://amazon.com",
        email: "demo-user@example.com",
        password: "AmazonDemo@2026!",
        isFavorite: false,
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com",
        email: "demo-user@example.com",
        password: "LinkedInDemo@2026!",
        isFavorite: false,
    },
    {
        name: "Dribbble",
        url: "https://dribbble.com",
        email: "demo-user@example.com",
        password: "DribbbleDemo@2026!",
        isFavorite: true,
    },
]

async function main() {
    // Create demo user
    const passwordHash = await bcrypt.hash("Password123!", 12)

    const user = await prisma.user.upsert({
        where: {
            email: "demo@example.com",
        },
        update: {
            isDemo: true,
        },
        create: {
            name: "Demo User",
            email: "demo@example.com",
            passwordHash,
            isDemo: true,
        },
    })

    // Remove old demo credentials so the seed is repeatable
    await prisma.credential.deleteMany({
        where: {
            userId: user.id,
        },
    })

    // Hash passwords and create demo credentials
    for (const credential of mockCredentials) {
        await prisma.credential.create({
            data: {
                name: credential.name,
                url: credential.url,
                email: credential.email,
                encryptedPassword: encrypt(credential.password),
                isFavorite: credential.isFavorite,
                userId: user.id,
            },
        })
    }

    console.log("Demo user and credentials created.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })