"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import {
    IconRestore,
    IconTrash,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
    deleteCredential,
    restoreCredential,
    trashCredential,
} from "@/actions/trash"

interface CredentialTrashProps {
    id: string
}

export default function CredentialTrash({
    id,
}: CredentialTrashProps) {
    const [isPending, startTransition] = useTransition()

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteCredential(id)

            if (!result.success) {
                toast.error(
                    result.error ?? "Failed to permanently delete item."
                )
                return
            }

            toast.success(
                result.message ?? "Credential permanently deleted."
            )
        })
    }

    function handleRestore() {
        startTransition(async () => {
            const result = await restoreCredential(id)

            if (!result.success) {
                toast.error(
                    result.error ?? "Failed to restore item."
                )
                return
            }

            toast.success(
                result.message ?? "Credential restored."
            )
        })
    }

    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleRestore}
                disabled={isPending}
            >
                <IconRestore />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleDelete}
                disabled={isPending}
            >
                <IconTrash />
            </Button>
        </div>
    )
}