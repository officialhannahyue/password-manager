import type { Metadata } from "next";
import { Roboto_Mono, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from '../components/theme/theme-provider';
import { Toaster } from "@/components/ui/sonner";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Password Manager",
  description: "application to manage your passwords.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", robotoSans.variable, robotoMono.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
