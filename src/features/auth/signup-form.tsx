"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect, useTransition } from "react"
import { loginAsDemo, SignUp } from "@/actions/auth"
import { toast } from "sonner"
import { redirect } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, pending] = useActionState(SignUp, {
    success: false
  });
  const [demoPending, startDemoTransition] = useTransition()
  useEffect(() => {
    if (state.success) {
      toast.success(state.message ?? "Account created successfully");
      redirect("/login")
    }

    if (state.error) {
      toast.error(state.error)
    }
  }, [state])
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input name="name" id="name" type="text" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input name="password" id="password" type="password" required placeholder="*******" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input name="passwordConfirm" id="confirm-password" type="password" required placeholder="*******" />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending ? "creating account..." : "Create Account"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={demoPending}
                  onClick={() => {
                    startDemoTransition(async () => {
                      await loginAsDemo()
                    })
                  }}
                >
                  {demoPending ? "Entering demo..." : "Try Demo Mode"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
