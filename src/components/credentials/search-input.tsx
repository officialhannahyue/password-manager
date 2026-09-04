"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

import { Spinner } from "@/components/ui/spinner"
import { IconSearch } from "@tabler/icons-react"

export default function SearchInput() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [value, setValue] = useState(
        searchParams.get("search") ?? ""
    )

    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (value) {
                params.set("search", value)
            } else {
                params.delete("search")
            }

            startTransition(() => {
                router.replace(`/dashboard?${ params.toString() }`)
            })
        }, 300)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <InputGroup className="w-full max-w-lg">
            <InputGroupAddon>
                {isPending ? (
                    <Spinner />
                ) : (
                    <IconSearch />
                )}
            </InputGroupAddon>

            <InputGroupInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search..."
            />
        </InputGroup>
    )
}