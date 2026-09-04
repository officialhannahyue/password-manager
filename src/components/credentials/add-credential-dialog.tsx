"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CredentialForm from "./credential-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "../ui/button"

export default function AddCredentialDialog() {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    function handleSuccess() {
        setOpen(false)
        router.refresh()
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                    <IconPlus />
                    Add Item
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Item</DialogTitle>
                    <DialogDescription>
                        Add a new credential to your vault.
                    </DialogDescription>
                </DialogHeader>

                <CredentialForm onSuccess={handleSuccess} />
            </DialogContent>
        </Dialog>
    )
}