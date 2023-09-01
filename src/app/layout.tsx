import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/reduxStore/provider'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'You can have MCQ type questions here for your knowledge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <ReduxProvider>
       <Navbar/>
        {children}
        </ReduxProvider>
        </AuthProvider>
        </body>
    </html>
  )
}
