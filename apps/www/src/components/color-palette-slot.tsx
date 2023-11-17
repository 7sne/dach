'use client'

import { motion, MotionProps } from 'framer-motion'
import { PlusIcon } from 'lucide-react'
import { HTMLAttributes, ReactElement } from 'react'

import tailwindConfig from '../../tailwind.config'
import { DEFAULT_COLOR_PALETTE } from '../lib/color-palette-const'
import { DEFAULT_RGB_POSITONS } from '../lib/mesh-gradient-canvas-const'
import { cn } from '../lib/utils'
import { useColors } from '../store/store-colors'
import { useRgbPositions } from '../store/store-rgb-positions'

export function ColorPaletteSlot({
    index,
    ...rest
}: ColorPaletteSlotProps): ReactElement {
    const { writeColor } = useColors()
    const { writePosition } = useRgbPositions()

    return (
        <motion.button
            className={cn(
                'w-full h-full cursor-pointer relative flex items-center justify-center',
                'bg-primary-foreground/5 hover:bg-primary-foreground/50 relative',
            )}
            onClick={() => {
                writeColor(index, DEFAULT_COLOR_PALETTE[index])
                writePosition(index, DEFAULT_RGB_POSITONS[index])
            }}
            {...rest}
        >
            <PlusIcon color={tailwindConfig.theme.extend.colors.foreground} />
        </motion.button>
    )
}

type ColorPaletteSlotProps = {
    index: number
} & HTMLAttributes<HTMLButtonElement> &
    MotionProps
