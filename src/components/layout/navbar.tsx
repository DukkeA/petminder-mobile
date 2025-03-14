"use client"

import type React from "react"

import Link from "next/link"
import { Home, User, CalendarFold, History, AlertCircle } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavItem {
  icon: React.ElementType
  label: string
  href: string
}

export function MobileNavbar() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      icon: Home,
      label: "Tasks",
      href: "/tasks",
    },
    {
      icon: CalendarFold,
      label: "Calendar",
      href: "/calendar",
    },
    {
      icon: History,
      label: "History",
      href: "/history",
    },
    {
      icon: AlertCircle,
      label: "Alerts",
      href: "/alerts",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
    },
  ]

  // Function to check if a nav item is active based on the current pathname
  const isActive = (href: string): boolean => {
    // Special case for home route
    if (href === "/" && pathname === "/") {
      return true
    }

    // For other routes, check if the pathname starts with the href
    // This ensures that sub-routes like /profile/settings still highlight the profile tab
    return href !== "/" && pathname.startsWith(href)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="flex justify-around bg-[#FFCC81] shadow-[0_-2px_8px_rgba(0,0,0,0.1)] border-t rounded-t-3xl">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center py-2 px-3 text-xs",
              "relative transition-all duration-200",
              isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            <div
              className={cn(
                "absolute -top-3 left-0 right-0 mx-auto h-1 w-12 rounded-full",
                "transition-all duration-200",
                isActive(item.href) ? "bg-primary" : "bg-transparent",
              )}
            />
            <div className={cn("rounded-t-xl p-2", isActive(item.href) ? "" : "")}>
              <item.icon className="h-6 w-6" />
            </div>
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

