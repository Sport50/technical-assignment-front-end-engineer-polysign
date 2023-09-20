import './globals.scss'

import styles from './layout.module.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Navigation } from './ui/navigation/navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clubee Assignment',
  description: 'Clubee Assignment App to list and create articles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section>
          <nav>
            <Navigation navLinks={[
              { label: 'Home', url: '/' },
              { label: 'Articles', url: '/articles' },
            ]} />
          </nav>
          
          <div className={styles.contentWrapper}>
            {children}
          </div>
        </section>
      </body>
    </html>
  )
}
