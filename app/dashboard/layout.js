import React from 'react'
import DashboardProvider from './Provider'

export default function Layout({children}) {
  return (
    <div>
      <DashboardProvider>
        {children}
      </DashboardProvider>
    </div>
  )
}