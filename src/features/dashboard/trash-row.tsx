"use client"

import { deleteCredential, restoreCredential } from "@/actions/trash"
import { Button } from "@/components/ui/button"
import { getServiceIcon } from "@/data/credential-icons"
import {
    IconLoader2,
    IconRestore,
    IconTrash,
} from "@tabler/icons-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

interface TrashRowProps {
    id: string,
    name: string
    email: string
}

export default function TrashRow({
    id,
    name,
    email,
}: TrashRowProps) {
    const Icon = getServiceIcon(name)
    const [isPending, startTransition] = useTransition()
    const [loadingAction, setLoadingAction] = useState<
        "restore" | "delete" | null
    >(null)

    function handleRestore() {
            setLoadingAction("restore")
        startTransition(async () => {
            const result = await restoreCredential(id)

            if (!result.success) {
                toast.error(
                    result.error ?? "Failed to restore credential."
                )
                return
            }

            toast.success(
                result.message ?? "Credential restored."
            )
            setLoadingAction(null)
        })
    }

    function handleDelete() {
        setLoadingAction("delete")
        startTransition(async () => {
            const result = await deleteCredential(id)

            if (!result.success) {
                toast.error(
                    result.error ?? "Failed to permanently delete credential."
                )
                return
            }

            toast.success(
                result.message ?? "Credential permanently deleted."
            )
            setLoadingAction(null)
        })
    }

    return (
        <div className="flex justify-between items-center gap-4 rounded-lg border border-border/30 bg-secondary px-4 py-3 sm:grid-cols-[1.5fr_2fr_1fr_auto]">
            <div className="flex min-w-0 items-center gap-3">
                <Button
                    size="icon"
                    variant="ghost"
                    className="size-9 shrink-0 rounded-md border bg-background/40 text-foreground [&_svg]:!size-5 [&_svg]:stroke-[1.5]"
                >
                    {Icon && <Icon />}
                </Button>
                <div className="flex flex-col">
                    <p className="min-w-0 truncate text-sm font-medium">
                        {name}
                    </p>
                    <p className="hidden min-w-0 truncate text-sm text-muted-foreground sm:block">
                        {email}
                    </p>
</div>
            </div>



            <div className="flex items-center justify-end gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    title="Restore"
                    onClick={handleRestore}
                >
                        {loadingAction === "restore" ? (
                            <IconLoader2 className="animate-spin" />
                        ) : (
                            <IconRestore />
                        )}
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    title="Delete permanently"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    {loadingAction === "delete" ? (
                        <IconLoader2 className="animate-spin" />
                    ) : (
                        <IconTrash />
                    )}
                </Button>
            </div>
        </div>
    )
}