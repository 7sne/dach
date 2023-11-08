import { useOnClickOutside } from '../hooks/use-on-click-outside'
import { Dispatch, ReactElement, SetStateAction, useRef, useState } from 'react'
import {
    ColorPicker as ReactColorPicker,
    IColor as Color,
} from 'react-color-palette'
import './styles/react-color-picker.css'

export function ColorPicker({
    color,
    showState: [show, setShow],
    handleUpdateColor,
}: Props): ReactElement | null {
    const colorPickerElement = useRef<HTMLDivElement>(null)
    const [selectedColor, setSelectedColor] = useState<Color>({
        hex: color.hex,
        hsv: color.hsv,
        rgb: color.rgb,
    })

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
                color={{
                    hex: selectedColor.hex,
                    hsv: selectedColor.hsv,
                    rgb: selectedColor.rgb,
                }}
                onChange={color => {
                    handleSelectColor(color)
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
