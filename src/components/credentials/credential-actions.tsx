"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
    IconStar,
    IconStarFilled,
    IconTrash,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { toggleFavorite } from "@/actions/credentials"
import { trashCredential } from "@/actions/trash"

interface CredentialActionsProps {
    id: string
    isFavorite: boolean
}

export default function CredentialActions({
    id,
    isFavorite,
}: CredentialActionsProps) {
    const [favorite, setFavorite] = useState(isFavorite)
    const [isPending, startTransition] = useTransition()

    function handleFavorite() {
        const previous = favorite

        setFavorite(!previous)

        startTransition(async () => {
            const result = await toggleFavorite(id)

            if (!result.success) {
                setFavorite(previous)

                toast.error(
                    result.error ?? "Failed to update favorite."
                )
            }
        })
    }

    function handleTrash() {
        startTransition(async () => {
            const result = await trashCredential(id)

            if (!result.success) {
                toast.error(
                    result.error ?? "Failed to move item to trash."
                )
                return
            }

            toast.success(
                result.message ?? "Credential moved to trash."
            )
        })
    }

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleFavorite}
                disabled={isPending}
            >
                {favorite ? (
                    <IconStarFilled />
                ) : (
                    <IconStar />
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleTrash}
                disabled={isPending}
            >
                <IconTrash />
            </Button>
        </div>
    )
}