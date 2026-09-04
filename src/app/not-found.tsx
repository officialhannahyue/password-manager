import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div>
          <h1 className="text-6xl font-bold tracking-tight">404</h1>
          <h2 className="mt-2 text-2xl font-semibold">Page not found</h2>
          <p className="mt-2 text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}