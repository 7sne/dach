import './styles/react-color-picker.css'

import { Dispatch, ReactElement, SetStateAction, useRef, useState } from 'react'
import {
    ColorPicker as ReactColorPicker,
    IColor as Color,
} from 'react-color-palette'

import { useOnClickOutside } from '../hooks/use-on-click-outside'

export function ColorPicker({
    color,
    showState: [show, setShow],
    handleUpdateColor,
}: Props): ReactElement | null {
    const colorPickerElement = useRef<HTMLDivElement>(null)
    const [selectedColor, setSelectedColor] = useState<Color>(color)

    function handleSelectColor(color: Color): void {
        setSelectedColor(color)
        handleUpdateColor(color)
    }

    useOnClickOutside(colorPickerElement, () => {
        setShow(false)
    })

    return show ? (
        <div
            ref={colorPickerElement}
            className="absolute left-[50%] transform translate-x-[-50%] shadow-lg shadow-background/30 z-[9999] w-[320px] mt-2 bg-black"
        >
            <ReactColorPicker
                height={120}
                color={selectedColor}
                onChange={color => {
                    const fixedColor: Record<string, any> = {}
                    // Library used here for some reason can't handle alpha values correctly.
                    if (Number.isNaN(Number.parseInt(color.hex.slice(7, 10))))
                        fixedColor['hex'] = color.hex.slice(0, 7)

                    handleSelectColor({
                        ...color,
                        ...fixedColor,
                    })
                }}
            />
        </div>
    ) : null
}

type Props = {
    color: Color
    showState: [boolean, Dispatch<SetStateAction<boolean>>]
    handleUpdateColor: (color: Color) => void
}
