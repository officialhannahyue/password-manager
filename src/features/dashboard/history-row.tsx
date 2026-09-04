import { Button } from "@/components/ui/button"
import { getServiceIcon } from "@/data/credential-icons"
import {
    IconEdit,
    IconHeart,
    IconPlus,
    IconRestore,
    IconTrash,
} from "@tabler/icons-react"

interface HistoryRowProps {
    name: string
    username: string
    type:
    | "CREATED"
    | "UPDATED"
    | "FAVORITED"
    | "UNFAVORITED"
    | "TRASHED"
    | "RESTORED"
    | "DELETED"
    createdAt: Date
}

const activityLabels = {
    CREATED: "Created",
    UPDATED: "Password updated",
    FAVORITED: "Added to favorites",
    UNFAVORITED: "Removed from favorites",
    TRASHED: "Moved to trash",
    RESTORED: "Restored",
    DELETED: "Permanently deleted",
}

// const activityIcons = {
//     CREATED: IconPlus,
//     UPDATED: IconEdit,
//     FAVORITED: IconHeart,
//     UNFAVORITED: IconHeart,
//     TRASHED: IconTrash,
//     RESTORED: IconRestore,
//     DELETED: IconTrash,
// }

export default function HistoryRow({
    name,
    username,
    type,
    createdAt,
}: HistoryRowProps) {
    const Icon = getServiceIcon(name)
    return (
        <div className="flex items-center gap-4 border-b py-4 last:border-b-0">
                <Button
                    size="icon"
                    variant="ghost"
                    className="size-9 shrink-0 rounded-md border bg-background/40 text-foreground [&_svg]:!size-6 [&_svg]:stroke-[1.5]"
                >
                    {Icon && <Icon/>}
                </Button>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                    {name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                    {username}
                </p>
            </div>

            <div className="text-right">
                <p className="text-sm">
                    {activityLabels[type]}
                </p>

                <p className="text-xs text-muted-foreground">
                    {createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </p>
            </div>
        </div>
    )
}