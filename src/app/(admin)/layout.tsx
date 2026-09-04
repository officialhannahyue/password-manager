import { getCurrentUser } from "@/actions/auth";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/layout/header";
import { NavActions } from "@/components/nav-actions";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login')
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex min-h-screen w-full flex-col">
                <Header/>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}