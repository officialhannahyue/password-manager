import { getCurrentUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

export default async function WelcomePage() {
    const user = await getCurrentUser();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-[clamp(4rem,14vw,9rem)] font-bold leading-[0.9] tracking-tight">
                    Welcome
                </h1>

                <h1 className="text-[clamp(3.5rem,12vw,8rem)] font-bold leading-[0.9] tracking-tight">
                    {user?.name}
                </h1>
            </div>

            <Button className="rounded-3xl px-6 py-5">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2">
                    <span>Go To Dashboard</span>
                    <IconArrowUpRight />
                </Link>
            </Button>
        </main>
    );
}