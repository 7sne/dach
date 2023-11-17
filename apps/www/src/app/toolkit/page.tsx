import { ReactElement } from 'react'

import { AddThemeCommand } from '../../components/add-theme-command'
import { BannerColorPalette } from '../../components/banner-color-palette'
import { GenerateBannerCommand } from '../../components/generate-banner-command'
import { AsteriskGlyph1 } from '../../components/icons/AsteriskGlyph1'
import { AsteriskGlyph2 } from '../../components/icons/AsteriskGlyph2'
import { MeshGradientPreview } from '../../components/mesh-gradient-preview'
import { TextColorPalette } from '../../components/text-color-palette'

export default function Toolkit(): ReactElement {
    return (
        <div className="relative flex flex-col w-full max-w-5xl px-2 mx-auto sm:px-8 xl:px-0">
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
                <AddThemeCommand />
                <GenerateBannerCommand />
            </div>
        </div>
    )
}
