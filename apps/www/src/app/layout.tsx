import './globals.css'

import { GeistMono, GeistSans } from 'geist/font'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { NavigationBar } from '../components/navigation-bar'
import { Providers } from './providers'

export const metadata: Metadata = {
    title: 'Dach',
    description: 'To be added :)',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable} ${GeistMono.variable}`}
        >
            <body>
                <Providers>
                    <NavigationBar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
