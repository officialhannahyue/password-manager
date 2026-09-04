"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { useTransition } from "react"
import { logout } from "@/actions/auth"
import { toast } from "sonner"

interface DropdownMenuIconsProps {
    user: {
        name?: string | null
    } | null
}

export function DropdownMenuIcons({
    user,
}: DropdownMenuIconsProps) {
    const [isPending, startTransition] = useTransition()

    const initials = user?.name
        ?.split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

    function handleLogout() {
        startTransition(async () => {
            const result = await logout()

            if (!result?.success) {
                toast.error(result?.error ?? "Failed to log out.")
                return
            }

            toast.success("Logged out successfully.");
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                    <AvatarFallback>
                        {user?.name
                            ?.split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        }
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleLogout}>
                    <IconLogout/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
