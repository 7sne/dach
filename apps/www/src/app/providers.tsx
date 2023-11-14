'use client'

import { ThemeProvider } from 'next-themes'
import { ReactElement, ReactNode } from 'react'

export function Providers({ children }: Props): ReactElement {
    return (
        <>
            <ThemeProvider defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
            <footer className="w-full px-16 py-10 mt-32 border-t sm:mt-48 bg-secondary/10">
                <div className="flex items-center justify-center max-w-5xl mx-auto">
                    <p className="tracking-wide text-secondary-foreground">
                        Made with ❤️ by Maciej Kukielka.
                    </p>
                </div>
            </footer>
        </>
    )
}

type Props = {
    children: ReactElement | ReactNode
}
