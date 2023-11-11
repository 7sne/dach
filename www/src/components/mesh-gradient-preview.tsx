import React, { TouchEventHandler } from 'react'
import debounce from 'lodash.debounce'
import { motion, useAnimate, useMotionValue } from 'framer-motion'
import {
    MouseEventHandler,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { MeshGradientDragHandle } from './mesh-gradient-handle'
import { hexCodesToRgb } from '../lib/hex-codes-to-rgb'
import { gradientImageData } from '../lib/gradient-image-data'
import {
    CANVAS_DEFAULT_SIZE_X,
    CANVAS_DEFAULT_SIZE_Y,
} from '../lib/mesh-gradient-canvas-const'
import { useColors } from '../store/store-colors'
import { AnimatedTabs } from './animated-tabs'
import { BannerRatioTabs } from './banner-ratio-tabs'
import { EditableText } from './editable-text'
import { useRgbPositions } from '../store/store-rgb-positions'
import { useText } from '../store/store-text'
import { useSize } from '../store/store-sizing'
import { controlBoxWithAdaptiveColor } from '../lib/control-box-with-adaptive-color'
import { downscaleFactor } from '../lib/downscale-factor'

const modeTabs = [
    { id: 'text', label: 'Text' },
    { id: 'controls', label: 'Controls' },
]

const ratioTabs = [
    { id: '2:1', label: '2:1' },
    { id: '16:9', label: '16:9' },
    { id: '16:10', label: '16:10' },
    { id: '21:9', label: '21:9' },
]

const downscaleFac = downscaleFactor()

export function MeshGradientPreview(): React.ReactElement {
    const { colors, textColor } = useColors()

    const canvasElement = useRef<HTMLCanvasElement>(null)
    const draggingIndexRef = useRef<number | null>(null)

    const { positions, writePositions } = useRgbPositions()

    const mWidth = useMotionValue(CANVAS_DEFAULT_SIZE_X * downscaleFac)
    const mHeight = useMotionValue(CANVAS_DEFAULT_SIZE_Y * downscaleFac)

    const { ratio, writeRatio, writeSize } = useSize()
    const {
        text: { title, description },
        writeTitle,
        writeDescription,
    } = useText()

    const [editMode, setEditMode] = useState<'text' | 'controls'>('text')

    const [canvasLoaded, setCanvasLoaded] = useState(false)
    const [scope, animate] = useAnimate()

    const redraw = useCallback(
        (canvas: HTMLCanvasElement) => {
            const context = canvas.getContext('2d')

            const width = canvas.width
            const height = canvas.height

            const rgbs = hexCodesToRgb(colors)

            const imageData = gradientImageData(
                context,
                width,
                height,
                rgbs,
                positions,
            )

            if (context) {
                context.putImageData(imageData, 0, 0)
                if (editMode === 'controls')
                    for (const position of positions)
                        controlBoxWithAdaptiveColor(
                            context,
                            position,
                            width,
                            height,
                        )
            }
        },
        [colors, positions, editMode],
    )

    useEffect(() => {
        if (canvasElement.current && !canvasLoaded) {
            setCanvasLoaded(true)
            animate(
                scope.current,
                { opacity: 1, scale: 1 },
                { duration: 0.4, bounce: 0.4, type: 'spring' },
            )
            redraw(canvasElement.current)
        }
    }, [positions, editMode, animate, scope, redraw, canvasLoaded])

    useEffect(() => {
        if (canvasElement?.current) {
            const w = mWidth.get()
            const h = mHeight.get()

            canvasElement.current.width = w
            canvasElement.current.height = h

            redraw(canvasElement.current)
        }
    }, [colors, mHeight, mWidth, redraw])

    const handleMouseDown = useCallback(
        (e: React.MouseEvent, index: number) => {
            if (!canvasElement?.current) return

            e.preventDefault()
            e.stopPropagation()

            draggingIndexRef.current = index

            const boundClientRect =
                canvasElement.current?.getBoundingClientRect()

            const offsetX = boundClientRect?.left ?? 0
            const offsetY = boundClientRect?.top ?? 0

            const clientX =
                (e as unknown as TouchEvent).touches?.[0]?.clientX ?? e.clientX
            const clientY =
                (e as unknown as TouchEvent).touches?.[0]?.clientY ?? e.clientY

            const mx = (clientX - offsetX) / canvasElement.current.width
            const my = (clientY - offsetY) / canvasElement.current.height

            for (const [index, position] of positions.entries()) {
                const dx = mx - position.x
                const dy = my - position.y

                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 0.05) {
                    draggingIndexRef.current = index
                    break
                }
            }
        },
        [positions],
    )

    const handleMouseUp = useCallback((e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        // Tell the canvas to stop dragging
        draggingIndexRef.current = null
    }, [])

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (draggingIndexRef.current !== null && canvasElement?.current) {
                const updatedPositions = [...positions]

                const touch = (e as unknown as TouchEvent).touches?.[0]
                if (touch) {
                    const rect = canvasElement.current.getBoundingClientRect()
                    const offsetX = touch.clientX - rect.left
                    const offsetY = touch.clientY - rect.top

                    updatedPositions[draggingIndexRef.current] = {
                        x: offsetX / canvasElement.current.width,
                        y: offsetY / canvasElement.current.height,
                    }

                    writePositions(updatedPositions)
                    return
                }

                updatedPositions[draggingIndexRef.current] = {
                    x: e.nativeEvent.offsetX / canvasElement.current.width,
                    y: e.nativeEvent.offsetY / canvasElement.current.height,
                }
                writePositions(updatedPositions)
            }
        },
        [positions, writePositions],
    )

    function handleDrag(event: MouseEvent, info: any, vertical: boolean): void {
        if (!vertical) {
            const newHeight = mHeight.get() + info.delta.y
            if (
                2000 > newHeight / downscaleFac &&
                1200 < newHeight / downscaleFac
            ) {
                mHeight.set(newHeight)
            }
        } else {
            const newWidth = mWidth.get() + info.delta.x
            if (
                4600 > newWidth / downscaleFac &&
                1800 < newWidth / downscaleFac
            ) {
                mWidth.set(newWidth)
            }
        }

        if (canvasElement.current) {
            canvasElement.current.width = mWidth.get()
            canvasElement.current.height = mHeight.get()
            redraw(canvasElement.current)
        }

        updateSize({
            width: Math.floor(mWidth.get() / downscaleFac),
            height: Math.floor(mHeight.get() / downscaleFac),
        })
    }

    // Apparently updating store on handle drag is too much.
    const updateSize = debounce(
        size => {
            writeRatio(null)
            writeSize(size)
        },
        1_200,
        { trailing: true },
    )

    function updateRatio(ratio: string): void {
        writeRatio(ratio)

        const set = () => {
            if (!canvasElement?.current) return
            canvasElement.current.width = mWidth.get()
            canvasElement.current.height = mHeight.get()
            redraw(canvasElement.current)
        }

        switch (ratio) {
            case '2:1':
                mWidth.set(3000 * downscaleFac)
                mHeight.set(1500 * downscaleFac)
                set()
                break
            case '21:9':
                mWidth.set(3000 * downscaleFac)
                mHeight.set(1285 * downscaleFac)
                set()
                break
            case '16:10':
                mWidth.set(3000 * downscaleFac)
                mHeight.set(1875 * downscaleFac)
                set()
                break
            case '16:9':
                mWidth.set(3000 * downscaleFac)
                mHeight.set(1685 * downscaleFac)
                set()
                break
            default:
        }
    }

    return (
        <div className="relative flex flex-col w-full h-full sm:p-10">
            <div className="absolute left-0 w-full mb-6 top-12 sm:justify-between sm:flex-wrap sm:flex">
                <AnimatedTabs
                    tabs={modeTabs}
                    activeTab={editMode === 'controls' ? 'controls' : 'text'}
                    handleUpdateActiveTab={mode => {
                        setEditMode(mode as 'text' | 'controls')
                    }}
                />
                <BannerRatioTabs
                    tabs={ratioTabs}
                    activeTab={ratio ?? '16:9'}
                    handleUpdateActiveTab={updateRatio}
                />
            </div>

            <motion.div
                ref={scope}
                className="relative mt-[160px] sm:mt-[80px] flex flex-col items-center justify-start"
                style={
                    !canvasLoaded
                        ? { opacity: 0, scale: 0.85 }
                        : { opacity: 1, scale: 1 }
                }
            >
                <div className="relative">
                    {editMode === 'text' && (
                        <div className="absolute z-0 flex flex-col items-center justify-center w-full h-full overflow-hidden">
                            <EditableText
                                data-title
                                text={title}
                                maxLength={20}
                                handleUpdateText={writeTitle}
                                textProps={{
                                    className:
                                        'title text-3xl sm:text-6xl leading-[2rem] sm:leading-[3.4rem] font-extrabold text-secondary whitespace-nowrap outline-black focus:outline-none',
                                    style: {
                                        color: textColor.title,
                                    },
                                }}
                            />
                            <EditableText
                                text={description}
                                maxLength={36}
                                handleUpdateText={writeDescription}
                                textProps={{
                                    className:
                                        'font-light text-sm sm:text-xl text-secondary outline-black focus:outline-none',
                                    style: {
                                        color: textColor.description,
                                    },
                                }}
                            />
                        </div>
                    )}
                    <motion.canvas
                        ref={canvasElement}
                        className="border"
                        style={{
                            imageRendering: 'crisp-edges',
                            touchAction: 'none',
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseUp={
                            handleMouseUp as unknown as MouseEventHandler<HTMLCanvasElement>
                        }
                        onMouseDown={
                            handleMouseDown as unknown as MouseEventHandler<HTMLCanvasElement>
                        }
                        onTouchEnd={
                            handleMouseUp as unknown as TouchEventHandler<HTMLCanvasElement>
                        }
                        onTouchMove={
                            handleMouseMove as unknown as TouchEventHandler<HTMLCanvasElement>
                        }
                        onTouchStart={
                            handleMouseDown as unknown as TouchEventHandler<HTMLCanvasElement>
                        }
                    />
                    <MeshGradientDragHandle
                        direction="e"
                        handleDrag={(event, info) =>
                            handleDrag(event, info, true)
                        }
                    />
                    <MeshGradientDragHandle
                        direction="s"
                        handleDrag={(event, info) =>
                            handleDrag(event, info, false)
                        }
                    />
                </div>
            </motion.div>
        </div>
    )
}
