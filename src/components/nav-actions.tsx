"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconSettings, IconFileText, IconLink, IconCopy, IconCornerUpRight, IconTrash, IconCornerUpLeft, IconChartLine, IconLayoutRows, IconBell, IconArrowUp, IconArrowDown, IconStar, IconDots, IconUser } from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        {new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </div>

    </div>
  )
}
