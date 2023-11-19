import { GithubIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactElement } from 'react'

import tailwindConfig from '../../tailwind.config'
import { ModeToggle } from '../components/theme-mode-toggle'

export function NavigationBar(): ReactElement {
    return (
        <header className="flex items-start justify-between w-full max-w-5xl p-8 mx-auto xl:py-8 xl:px-0 xl:mb-6">
            <Link href="/" className="cursor-pointer">
                <div className="flex items-start justify-start gap-x-1">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 467 270"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M311 1L466.019 269.5H155.981L311 1Z"
                            fill={tailwindConfig.theme.extend.colors.foreground}
                        />
                        <path
                            d="M76 269.5H147L301.5 0.5H243L76 269.5Z"
                            fill={tailwindConfig.theme.extend.colors.foreground}
                        />
                        <path
                            d="M0 270H71L225.5 1H167L0 270Z"
                            fill={tailwindConfig.theme.extend.colors.foreground}
                        />
                    </svg>
                    <h1 className="text-2xl font-bold select-none text-primary">
                        Dach
                    </h1>
                </div>
            </Link>

            <div className="flex items-center justify-center gap-x-4">
                <Link href="https://github.com/7sne/dach">
                    <GithubIcon strokeWidth="1.4" />
                </Link>
                <ModeToggle />
            </div>
        </header>
    )
}
