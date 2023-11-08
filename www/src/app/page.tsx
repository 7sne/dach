'use client'

import React from 'react'
import { MeshGradientPreview } from '../components/mesh-gradient-preview'
import { AsteriskGlyph1 } from '../components/icons/AsteriskGlyph1'
import { AsteriskGlyph2 } from '../components/icons/AsteriskGlyph2'
import { GenerateBannerCliCommand } from '../components/generate-banner-cli-command'
import { AddThemeCliCommand } from '../components/add-theme-cli-command'
import { BannerColorPalette } from '../components/banner-color-palette'
import { TextColorPalette } from '../components/text-color-palette'
import { ModeToggle } from '../components/theme-mode-toggle'
import tailwindConfig from '../../tailwind.config'

export default function Home(): React.ReactElement {
    return (
        <main className="flex flex-col items-center max-w-5xl min-h-screen mx-auto sm:p-8 gap-y-8">
            <header className="flex items-start justify-between w-full p-6 sm:mb-6 sm:p-0">
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
                            fill={
                                tailwindConfig.theme?.extend?.colors?.foreground
                            }
                        />
                        <path
                            d="M76 269.5H147L301.5 0.5H243L76 269.5Z"
                            fill={
                                tailwindConfig.theme?.extend?.colors?.foreground
                            }
                        />
                        <path
                            d="M0 270H71L225.5 1H167L0 270Z"
                            fill={
                                tailwindConfig.theme?.extend?.colors?.foreground
                            }
                        />
                    </svg>
                    <h1 className="text-2xl font-extrabold cursor-default select-none text-primary">
                        Dach
                    </h1>
                </div>

                <ModeToggle />
            </header>

            <div className="relative flex flex-col w-full max-w-5xl mx-auto">
                <AsteriskGlyph1
                    width={64}
                    height={64}
                    className="hidden opacity-75 -right-8 -bottom-8 sm:absolute"
                />

                <div className="z-10 flex flex-col-reverse items-start justify-between w-full px-8 mb-8 sm:mb-0 sm:px-0 sm:border-t sm:flex-row sm:flex-nowrap sm:border-x">
                    <BannerColorPalette />
                    <TextColorPalette />
                </div>

                <div className="relative flex items-center justify-center w-full px-6 mx-auto sm:border h-[380px] sm:h-[560px]">
                    <AsteriskGlyph2
                        width={64}
                        height={64}
                        className="absolute opacity-75 -left-8 -bottom-8"
                    />
                    <div className="absolute w-full h-full pattern" />
                    <div className="absolute w-full h-full bg-gradient-radial from-background to-transparent" />
                    <MeshGradientPreview />
                </div>

                <h3 className="px-6 mt-20 mb-4 text-lg sm:px-0 text-primary">
                    Generated config
                </h3>

                <div className="mx-6 sm:mx-0">
                    <AddThemeCliCommand />
                    <GenerateBannerCliCommand />
                </div>
            </div>
        </main>
    )
}
