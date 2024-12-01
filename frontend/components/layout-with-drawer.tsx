'use client'

import { useState } from 'react'
import { Drawer } from '@/components/ui/drawer'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'

export default function LayoutWithDrawer({
  children,
}: {
  children: React.ReactNode,
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block w-64 flex-shrink-0 bg-white border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <Sidebar />
        </Drawer>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

