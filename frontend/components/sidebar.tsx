import Link from 'next/link'
import { Home, Table, Github, Code } from 'lucide-react'

export default function Sidebar() {
  return (
    <nav className="bg-white text-gray-800 h-full w-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Rejectedly Yours</h1>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-indigo-50 text-gray-700 hover:text-indigo-700">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/inbox" className="flex items-center space-x-2 p-2 rounded hover:bg-indigo-50 text-gray-700 hover:text-indigo-700">
              <Table className="h-5 w-5" />
              <span>Inbox</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <a href="https://github.com/yourusername/rejectedly-yours" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-indigo-700">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <span className="flex items-center space-x-1">
            <Code className="h-4 w-4" />
            <span>Made with ❤️</span>
          </span>
        </div>
      </div>
    </nav>
  )
}

