import { IconInbox } from "@tabler/icons-react"

interface EmptyStateProps {
    title: string
    description?: string
    icon?: React.ReactNode
    action?: React.ReactNode
}

export default function EmptyState({
    title,
    description,
    icon,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-secondary/40 px-6 text-center">
            <div className="mb-4 flex size-11 items-center justify-center rounded-lg border bg-background/60 text-muted-foreground [&_svg]:size-5 [&_svg]:stroke-[1.5]">
                {icon ?? <IconInbox />}
            </div>

            <h2 className="text-sm font-medium">
                {title}
            </h2>

            {description && (
                <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-4">
                    {action}
                </div>
            )}
        </div>
    )
}