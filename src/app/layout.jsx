import './globals.css'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import Link from 'next/link';

export const metadata = {
  title: 'Simple, Online, AI-Powered Mortgage | Better Mortgage',
  description: '',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
