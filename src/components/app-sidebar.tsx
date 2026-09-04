"use client"

import * as React from "react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { IconCommand, IconWaveSine, IconSearch, IconSparkles, IconHome, IconInbox, IconCalendar, IconSettings, IconCube, IconTrash, IconMessageQuestion, IconLockAccess, IconChevronDown, IconLayoutGrid, IconStar, IconClock } from "@tabler/icons-react"
import { Separator } from "./ui/separator"
import {
  IconBrandDiscordFilled,
  IconBrandFigma,
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
  IconBrandLinkedin,
  IconBrandNotion,
  IconBrandSpotifyFilled,
  IconBrandVercelFilled,
} from "@tabler/icons-react"

const serviceIcons = {
  GitHub: IconBrandGithubFilled,
  Google: IconBrandGoogleFilled,
  Discord: IconBrandDiscordFilled,
  Figma: IconBrandFigma,
  LinkedIn: IconBrandLinkedin,
  Notion: IconBrandNotion,
  Spotify: IconBrandSpotifyFilled,
  Vercel: IconBrandVercelFilled,
}
// This is sample data.
const data = {
  brand: {
      name: "Password Manager",
      logo: (
        <IconLockAccess strokeWidth={1.5}
        />
      ),
      plan: "Enterprise",
    },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <IconLayoutGrid strokeWidth={1.5}
        />
      ),
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: (
        <IconStar strokeWidth={1.5}
        />
      ),
    },
    {
      title: "History",
      url: "/history",
      icon: (
        <IconClock strokeWidth={1.5}
        />
      ),
    },
    {
      title: "Trash",
      url: "/trash",
      icon: (
        <IconTrash strokeWidth={1.5}
        />
      ),
      badge: "10",
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenuButton className="w-full px-1.5">
          <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            {data.brand.logo}
          </div>
          <span className="truncate font-normal">{data.brand.name}</span>
        </SidebarMenuButton>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
