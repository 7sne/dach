import { ReactElement } from 'react'
import { MAX_COLORS_IN_PALETTE } from '../lib/color-palette-const'
import { useColors } from '../store/store-colors'
import { ColorPaletteSlot } from './color-palette-slot'
import { PickColorTile } from './pick-color-tile'

export function BannerColorPalette(): ReactElement {
    const { colors, writeColor } = useColors()

    return (
        <div className="grid h-20 grid-cols-4 grid-rows-1 w-full gap-x-1 sm:w-[22rem] relative">
            {colors.map((_, i) => {
                const color = colors[i]
                return (
                    <PickColorTile
                        key={i}
                        color={color}
                        handleWriteColor={color => {
                            writeColor(i, color)
                        }}
                    />
                )
            })}
            {colors.length < MAX_COLORS_IN_PALETTE && (
                <ColorPaletteSlot index={colors.length} />
            )}
        </div>
    )
}
