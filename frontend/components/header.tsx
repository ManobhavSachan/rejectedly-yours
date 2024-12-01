import { MenuIcon, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header({ onMenuClick, title }: { onMenuClick: () => void, title: string }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex items-center space-x-4 ml-auto">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

