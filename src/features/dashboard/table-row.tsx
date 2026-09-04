"use client"
import { revealCredentialPassword } from "@/actions/credentials";
import CredentialActions from "@/components/credentials/credential-actions";
import { Button } from "@/components/ui/button";
import { formatRelativeDate } from "@/lib/format";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface TableRowProps {
    id: string;
    icon?: React.ReactNode;
    title: string;
    email: string;
    updated: Date;
    isFavorite: boolean;
}
export default function TableRow({
    id,
    icon,
    title,
    email,
    updated,
    isFavorite,
}: TableRowProps) {
    const [favorite, setFavorite] = useState(isFavorite)
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState("")

    function handleRevealPassword() {
        if (showPassword) {
            setShowPassword(false)
            return
        }

        startTransition(async () => {
            const result = await revealCredentialPassword(id)

            if (!result.success) {
                toast.error(result.error)
                return
            };
            setPassword(result.password)
            setShowPassword(true)
        })
    }
    return (
        <div className="bg-secondary rounded-lg grid border border-border/30 px-2 py-4 grid-cols-[1fr_auto] sm:grid-cols-[1.25fr_2fr_1.25fr_1fr_1fr] items-center sm:gap-4 gap-2">
            <div className="flex min-w-0 items-center gap-3">
                {icon ? (
                    <Button
                        size="icon"
                        variant="ghost"
                        className="size-9 shrink-0 rounded-md border bg-background/40 text-foreground [&_svg]:!size-6 [&_svg]:stroke-[1.5]"
                    >
                        {icon}
                    </Button>
                ) : (
                        <Button
                            size="icon"
                            variant="ghost"
                            className="size-9 shrink-0 rounded-md border bg-background/40 text-foreground [&_svg]:!size-8 [&_svg]:stroke-[1.5]"
                        >
                            <span className="text-2xl">
                                {title[0]}
                            </span>
                        </Button>
                )}

                <div className="min-w-0">
                    <p className="truncate text-lg font-medium">
                        {title}
                    </p>
                </div>
            </div>

            <p className="hidden min-w-full truncate text-sm text-muted-foreground sm:block">
                {email}
            </p>

            <div className="hidden min-w-18 items-center max-w-26 gap-1 justify-between sm:flex">
                <p className="truncate font-mono text-sm sm:max-w-24 max-w-16">
                    {showPassword ? password : "••••••••"}
                </p>

                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={handleRevealPassword}
                >
                    {showPassword ? <IconEyeOff /> : <IconEye />}
                </Button>
            </div>

            <p className="hidden min-w-full text-sm text-muted-foreground sm:block">
                {formatRelativeDate(updated)}
            </p>

            <div className="flex sm:flex items-center justify-end gap-1">
                <CredentialActions
    id={id}
    isFavorite={isFavorite}
/>
            </div>
            <p className="col-span-full px-2 truncate text-xs text-muted-foreground sm:hidden">
                {email}
            </p>
        </div>
    );
}