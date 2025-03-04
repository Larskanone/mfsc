"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronLeft, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const SidebarContext = React.createContext<{
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  collapsible: "always" | "responsive" | "none"
  isMobile: boolean
}>({
  expanded: true,
  setExpanded: () => undefined,
  collapsible: "responsive",
  isMobile: false,
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function SidebarProvider({ children, defaultExpanded = true }: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        setExpanded,
        collapsible: "responsive",
        isMobile,
      }}
    >
      <div className="grid md:grid-cols-[auto_1fr]">{children}</div>
    </SidebarContext.Provider>
  )
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: "always" | "responsive" | "none"
  side?: "left" | "right"
}

export function Sidebar({ className, collapsible = "responsive", side = "left", ...props }: SidebarProps) {
  const { expanded, setExpanded, isMobile } = useSidebar()

  return (
    <aside
      data-expanded={expanded}
      data-collapsible={collapsible}
      data-side={side}
      className={cn(
        "group relative z-30 flex h-full min-h-screen w-full flex-col border-r bg-background data-[expanded=false]:w-[--sidebar-icon-width] data-[side=right]:border-l data-[side=right]:border-r-0 md:w-[--sidebar-width]",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("px-3 py-2", className)} {...props} />
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <div className={cn("px-3 py-2", className)} {...props} />
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return <div className={cn("px-3 py-2", className)} {...props} />
}

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <div
      className={cn(
        "mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground group-data-[expanded=false]:text-center group-data-[expanded=false]:text-[0.625rem]",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return <div className={cn("space-y-1", className)} {...props} />
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <div className={cn("space-y-1 px-3", className)} {...props} />
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <div className={cn("relative", className)} {...props} />
}

const sidebarMenuButtonVariants = cva(
  "group relative flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "text-foreground",
      },
      size: {
        default: "py-2",
        sm: "py-1",
        lg: "py-3",
      },
    },
    defaultVariants: {
      isActive: false,
      size: "default",
    },
  },
)

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, isActive, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return <Comp ref={ref} className={cn(sidebarMenuButtonVariants({ isActive, size, className }))} {...props} />
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showOnHover?: boolean
}

export const SidebarMenuAction = React.forwardRef<HTMLButtonElement, SidebarMenuActionProps>(
  ({ className, showOnHover, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground",
          showOnHover && "opacity-0 group-hover:opacity-100",
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuAction.displayName = "SidebarMenuAction"

interface SidebarMenuBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuBadge({ className, ...props }: SidebarMenuBadgeProps) {
  return (
    <div
      className={cn(
        "absolute right-2 top-1/2 flex h-5 min-w-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuSub({ className, ...props }: SidebarMenuSubProps) {
  return <div className={cn("ml-4 mt-1 space-y-1 border-l pl-3", className)} {...props} />
}

interface SidebarMenuSubItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuSubItem({ className, ...props }: SidebarMenuSubItemProps) {
  return <div className={cn("relative", className)} {...props} />
}

interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
}

export const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, SidebarMenuSubButtonProps>(
  ({ className, isActive, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return <Comp ref={ref} className={cn(sidebarMenuButtonVariants({ isActive, size, className }))} {...props} />
  },
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

interface SidebarRailProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarRail({ className, ...props }: SidebarRailProps) {
  const { expanded, setExpanded, collapsible, isMobile } = useSidebar()

  if (collapsible === "none") {
    return null
  }

  if (collapsible === "responsive" && !isMobile) {
    return null
  }

  return (
    <div
      className={cn(
        "absolute right-0 top-6 z-40 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border bg-background shadow-sm",
        className,
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setExpanded(!expanded)}>
        <ChevronLeft className={cn("h-3 w-3 transition-transform", expanded ? "rotate-0" : "rotate-180")} />
        <span className="sr-only">{expanded ? "Collapse sidebar" : "Expand sidebar"}</span>
      </Button>
    </div>
  )
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  const { expanded, setExpanded } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={() => setExpanded(!expanded)}
      {...props}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({ className, ...props }: SidebarInsetProps) {
  return <div className={cn("flex h-full min-h-screen flex-col", className)} {...props} />
}

interface SidebarInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SidebarInput = React.forwardRef<HTMLInputElement, SidebarInputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return <div className={cn("mx-3 my-2 h-px bg-border", className)} {...props} />
}

