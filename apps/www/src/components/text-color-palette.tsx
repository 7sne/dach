import React from 'react'
import { useColors } from '../store/store-colors'
import { PickColorTile } from './pick-color-tile'

export function TextColorPalette(): React.ReactElement {
    const {
        textColor: { title, description },
        writeTitleColor,
        writeDescriptionColor,
    } = useColors()

    return (
        <div className="grid h-20 grid-cols-2 grid-rows-1 w-full sm:w-[11rem] relative gap-x-0.5 mb-2 sm:mb-0">
            <PickColorTile
                data-cy="title-pick-color"
                color={title}
                handleWriteColor={color => {
                    writeTitleColor(color)
                }}
            />
            <PickColorTile
                data-cy="description-pick-color"
                color={description}
                handleWriteColor={color => {
                    writeDescriptionColor(color)
                }}
            />
        </div>
    )
}
