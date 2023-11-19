'use client'

import Link from 'next/link'
import { ThemeProvider } from 'next-themes'
import { ReactElement, ReactNode } from 'react'

export function Providers({ children }: Props): ReactElement {
    return (
        <>
            <ThemeProvider defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
            <footer className="w-full px-16 py-10 mt-12 border-t sm:mt-48 bg-secondary/10">
                <div className="flex items-center justify-center max-w-5xl mx-auto">
                    <p className="tracking-wide text-secondary-foreground">
                        Made with ❤️ by{' '}
                        <Link
                            className="underline underline-offset-2"
                            href="https://twitter.com/KukielkaMaciej"
                        >
                            Maciej Kukielka
                        </Link>
                        .
                    </p>
                </div>
            </footer>
        </>
    )
}

type Props = {
    children: ReactElement | ReactNode
}
