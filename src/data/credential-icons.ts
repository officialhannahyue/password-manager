import {
    IconBrandAmazon,
    IconBrandDiscordFilled,
    IconBrandDribbbleFilled,
    IconBrandFigma,
    IconBrandGithubFilled,
    IconBrandGoogleFilled,
    IconBrandLinkedinFilled,
    IconBrandNotion,
    IconBrandSpotifyFilled,
    IconBrandVercelFilled,
} from "@tabler/icons-react"

export const serviceIcons = {
    GitHub: IconBrandGithubFilled,
    Google: IconBrandGoogleFilled,
    Discord: IconBrandDiscordFilled,
    Figma: IconBrandFigma,
    LinkedIn: IconBrandLinkedinFilled,
    Notion: IconBrandNotion,
    Spotify: IconBrandSpotifyFilled,
    Vercel: IconBrandVercelFilled,
    Amazon: IconBrandAmazon,
    Dribbble: IconBrandDribbbleFilled
} as const

export function getServiceIcon(name: string) {
    const key = Object.keys(serviceIcons).find(
        (key) => key.toLowerCase() === name.trim().toLowerCase()
    )

    return key
        ? serviceIcons[key as keyof typeof serviceIcons]
        : undefined
}