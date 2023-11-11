import './globals.css'

import type { Metadata } from 'next'
import { GeistSans, GeistMono } from 'geist/font'
import { ReactNode } from 'react'
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
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
