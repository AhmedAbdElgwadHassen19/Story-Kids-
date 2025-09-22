"use client"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookOpen, LayoutDashboard, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

  const path = usePathname();
  const menu = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "My Stories", path: "/dashboard/my-stories", icon: BookOpen },
  ]
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width ={150} height={100} />
      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup >
          <Button>Generate your story</Button>
        </SidebarGroup >

        <SidebarGroup >
          <SidebarGroupContent >
            <SidebarMenu>
            {menu.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className ="p-3 h-13">
                  <Link href={item.path} className ={`w-full flex items-center  gap-2 mt-4 ml-4 ${path===item.path ? "bg-[#f4dce7] text-white rounded-lg p-2" : ""}`}>
                    {item.icon && <item.icon className="font-20 text-[#c9749d]" />}
                    <p className ="text-lg text-black">{item.title}</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup >

      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}