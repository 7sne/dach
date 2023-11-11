import { motion } from 'framer-motion'
import { ColorPicker } from './color-picker'
import React, { useState } from 'react'
import { hexToHsva } from '../lib/hex-to-hsva'
import { hexToRgba } from '../lib/hex-to-rgba'
import { cn } from '../lib/utils'

export function PickColorTile({
    color,
    className,
    handleWriteColor,
    ...rest
}: ColorSlotProps): React.ReactElement {
    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    return (
        <div className={(cn('relative w-full'), className)} {...rest}>
            <motion.div
                style={{ backgroundColor: color }}
                className="flex items-center justify-center w-full h-full font-bold border cursor-pointer group text-primary/50 hover:bg-primary-foreground/10 sm:border-none"
                onClick={() => setDisplayColorPicker(!displayColorPicker)}
            />

            <ColorPicker
                color={{
                    hex: color,
                    hsv: hexToHsva(color),
                    rgb: hexToRgba(color),
                }}
                showState={[displayColorPicker, setDisplayColorPicker]}
                handleUpdateColor={color => {
                    handleWriteColor(color.hex)
                }}
            />
        </div>
    )
}

type ColorSlotProps = {
    color: string
    handleWriteColor: (color: string) => void
} & React.HTMLAttributes<HTMLDivElement>
