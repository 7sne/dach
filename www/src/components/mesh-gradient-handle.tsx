import { motion } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'
import { cn } from '../lib/utils'
import {
    RESIZE_HANDLE_WIDTH_PX,
    RESIZE_HANDLE_HEIGHT_PX,
} from '../lib/mesh-gradient-canvas-const'
import tailwindConfig from '../../tailwind.config'
import { ReactElement } from 'react'

export function MeshGradientDragHandle({
    direction,
    handleDrag,
}: Props): ReactElement {
    const directionToCx = {
        s: 'absolute -bottom-10 right-0 cursor-row-resize',
        e: 'absolute top-0 -right-10 cursor-col-resize',
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
            dragElastic={0}
            dragMomentum={false}
            onDrag={handleDrag}
            style={{
                width:
                    direction === 'e' ? `${RESIZE_HANDLE_WIDTH_PX}px` : '100%',
                height:
                    direction === 's' ? `${RESIZE_HANDLE_HEIGHT_PX}px` : '100%',
            }}
            // @ts-ignore
            className={`${directionToCx[direction]} items-center justify-center hidden sm:flex`}
        >
            <div className="w-[calc(50%-22px)] h-[1px] bg-secondary-foreground/50 absolute left-0" />
            <div className="w-[calc(50%-22px)] h-[1px] bg-secondary-foreground/50 absolute right-0" />

            <div className="w-[1px] h-[calc(50%-22px)] bg-secondary-foreground/50 absolute top-0 right-3" />
            <div className="w-[1px] h-[calc(50%-22px)] bg-secondary-foreground/50 absolute bottom-0 right-3" />

            <ChevronsLeftRight
                color={
                    // @ts-ignore
                    tailwindConfig.theme.extend.colors.secondary.foreground[50]
                }
                strokeWidth={0.8}
                className={cn('absolute', direction === 's' && 'rotate-90')}
            />
        </motion.div>
    )
}

type Props = {
    direction: 'n' | 's' | 'e' | 'w'
    handleDrag?: (event: any, info: any) => void
}
