"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { IconRefresh } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export default function RefreshButton() {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    function handleRefresh() {
        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={pending}
        >
            <IconRefresh
                className={pending ? "animate-spin" : ""}
            />
            <span className="sr-only">Refresh</span>
        </Button>
    )
}