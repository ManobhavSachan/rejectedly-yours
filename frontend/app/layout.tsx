import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutWithDrawer from '@/components/layout-with-drawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rejectedly Yours',
  description: 'Track your rejections and turn them into opportunities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWithDrawer>{children}</LayoutWithDrawer>
      </body>
    </html>
  )
}

