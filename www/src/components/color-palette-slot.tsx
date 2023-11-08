import { motion } from 'framer-motion'
import { useColors } from '../store/store-colors'
import { cn } from '../lib/utils'
import { PlusIcon } from 'lucide-react'
import tailwindConfig from '../../tailwind.config'
import { useRgbPositions } from '../store/store-rgb-positions'
import { DEFAULT_RGB_POSITONS } from '../lib/mesh-gradient-canvas-const'
import { DEFAULT_COLOR_PALETTE } from '../lib/color-palette-const'
import { ReactElement } from 'react'

export function ColorPaletteSlot({
    index,
}: ColorPaletteSlotProps): ReactElement {
    const { writeColor } = useColors()
    const { writePosition } = useRgbPositions()

    return (
        <div className="relative w-full">
            <motion.div
                className={cn(
                    'w-full h-full cursor-pointer relative flex items-center justify-center',
                    'bg-primary-foreground/5 hover:bg-primary-foreground/50',
                )}
                onClick={() => {
                    writeColor(index, DEFAULT_COLOR_PALETTE[index])
                    writePosition(index, DEFAULT_RGB_POSITONS[index])
                }}
            >
                <PlusIcon
                    // @ts-ignore
                    color={tailwindConfig.theme.extend.colors.foreground}
                />
            </motion.div>
        </div>
    )
}

type ColorPaletteSlotProps = {
    index: number
}
