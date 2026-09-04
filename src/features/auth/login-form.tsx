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
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useTransition } from "react"
import { Login, loginAsDemo } from '@/actions/auth';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, pending] = useActionState(Login, {
    success: false
  });
  const [demoPending, startDemoTransition] = useTransition()
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" id="password" type="password" required placeholder="example1234" />
              </Field>
              <Field>
                <Button type="submit" disabled={pending}>
                  {pending ? "Logging in..." : "Login"}
                </Button>
              </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
              </FieldSeparator>
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
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
