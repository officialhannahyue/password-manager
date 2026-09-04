"use client"

import { useActionState, useEffect } from "react"
import { toast } from "sonner"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CredentialState } from "@/types/credentials"
import { createCredential } from "@/actions/credentials"
export const initialState: CredentialState = {
  success: false,
}

interface CredentialFormProps {
  onSuccess: () => void
}

export default function CredentialForm({
  onSuccess,
}: CredentialFormProps) {
  const [state, formAction, pending] = useActionState(
    createCredential,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? "Credential created successfully.");
    }
    onSuccess()

    if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Google"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://google.com"
            />
          </Field>
        </div>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
          <FieldDescription>
            Your password will be securely stored.
          </FieldDescription>
        </Field>

        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Item"}
        </Button>
      </FieldGroup>
    </form>
  )
}