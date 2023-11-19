'use client'

import { motion, MotionProps } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'
import { HTMLAttributes, ReactElement } from 'react'

import tailwindConfig from '../../tailwind.config'
import {
    RESIZE_HANDLE_HEIGHT_PX,
    RESIZE_HANDLE_WIDTH_PX,
} from '../lib/mesh-gradient-canvas-const'
import { cn } from '../lib/utils'

export function BannerResizeHandle({
    orientation,
    handleDrag,
    ...rest
}: Props): ReactElement {
    const directionToCx = {
        vertical: 'absolute -bottom-10 right-0 cursor-row-resize',
        horizontal: 'absolute top-0 -right-10 cursor-col-resize',
    }

    return (
        <motion.div
            drag
            dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
            role="separator"
            tabIndex={0}
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            aria-orientation={orientation}
            aria-label={`${orientation} banner resize handle`}
            style={{
                width:
                    orientation === 'horizontal'
                        ? `${RESIZE_HANDLE_WIDTH_PX}px`
                        : '100%',
                height:
                    orientation === 'vertical'
                        ? `${RESIZE_HANDLE_HEIGHT_PX}px`
                        : '100%',
            }}
            className={`${directionToCx[orientation]} items-center justify-center hidden sm:flex`}
            {...rest}
        >
            <div className="w-[calc(50%-22px)] h-[1px] bg-secondary-foreground/50 absolute left-0" />
            <div className="w-[calc(50%-22px)] h-[1px] bg-secondary-foreground/50 absolute right-0" />

            <div className="w-[1px] h-[calc(50%-22px)] bg-secondary-foreground/50 absolute top-0 right-3" />
            <div className="w-[1px] h-[calc(50%-22px)] bg-secondary-foreground/50 absolute bottom-0 right-3" />

            <ChevronsLeftRight
                color={
                    tailwindConfig.theme.extend.colors.secondary.foreground[50]
                }
                strokeWidth={0.8}
                className={cn(
                    'absolute',
                    orientation === 'vertical' && 'rotate-90',
                )}
            />
        </motion.div>
    )
}

type Props = {
    orientation: 'horizontal' | 'vertical'
    handleDrag?: (event: any, info: any) => void
} & HTMLAttributes<HTMLDivElement> &
    MotionProps
