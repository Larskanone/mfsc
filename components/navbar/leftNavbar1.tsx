"use client"
import { Home, Images, LandPlot, Link as LinkIcon, Plane, Section } from "lucide-react"
import Image from 'next/image'
import Logo from './logo.svg'
import { useLocation } from 'react-router-dom'


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
import { Link } from "@mui/joy"


// Navigation items data
const navItems = [
  { icon: Home, label: "Der Verein", href: "/verein" }, // Wir über uns, Vorstand, Mitglieder
  { icon: LandPlot, label: "Der Flugplatz", href: "/flugplatz" },
  { icon: Images, label: "Galerie", href: "/galerie" },
  { icon: LinkIcon, label: "Links", href: "/links" },
  { icon: Plane, label: "Modelle", href: "/modelle" },
  { icon: Section, label: "Rechtliches", href: "/legal" },
]

export function LeftNavbarComp() {

  const usePathname = () => {
    if (typeof window !== "undefined") {
      const location = useLocation();
      return location.pathname;
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-6 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={usePathname() === item.href}>
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
