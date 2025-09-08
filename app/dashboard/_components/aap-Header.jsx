import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function AppHeader() {
  return (
    <div className = "flex items-center justify-between p-4 border-b">
        <SidebarTrigger />
        <UserButton />
    </div>
  )
}
