import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar"
import AppHeader from './_components/aap-Header'
export default function DashboardProvider({children}) {
  return (
    <div>
      <SidebarProvider>

        <AppSidebar />

        <div className="w-full">
          <AppHeader />
          {children}
        </div>

          
        
      </SidebarProvider>
    </div>
  )
}


