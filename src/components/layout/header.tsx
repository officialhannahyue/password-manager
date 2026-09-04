import { Container } from "./container"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { getCurrentUser } from "@/actions/auth"
import ThemeToggle from "../theme/theme-toggle"
import { DropdownMenuIcons } from "../dropdown-menu-icons"

export default async function Header() {
    const user = await getCurrentUser()
    console.log(user)

    return (
        <Container className="border-b px-0">
            <SidebarInset>
                <header className="flex h-14 shrink-0 items-center gap-2 px-4">
                    <div className="flex flex-1 items-center gap-2">
                        <SidebarTrigger />
                    </div>

                    <div className="ml-auto flex items-center gap-2 px-3">
                        <ThemeToggle />
                        <DropdownMenuIcons user={user} />
                    </div>
                </header>
            </SidebarInset>
        </Container>
    )
}