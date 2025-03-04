"use client"
import { BarChart3, Home, LayoutDashboard, MessageSquare, Settings, ShoppingCart, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail 
} from "./comp/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./comp/avatar"

// Navigation items data
const navItems = [
  { icon: Home, label: "Home", href: "/home" },
  { icon: LayoutDashboard, label: "Dashboard", href: "#", active: true },
  { icon: ShoppingCart, label: "Products", href: "#" },
  { icon: Users, label: "Customers", href: "#" },
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: MessageSquare, label: "Messages", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
]

export function LeftNavbar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-lg font-semibold">LeftNav</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={item.active}>
                <a href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

