'use client'

import { ReactElement } from 'react'

import { useColors } from '../store/store-colors'
import { useRgbPositions } from '../store/store-rgb-positions'
import { useText } from '../store/store-text'
import { DachCommand } from './dach-command'

export function AddThemeCommand(): ReactElement {
    const {
        colors,
        textColor: { title, description },
    } = useColors()
    const { positions } = useRgbPositions()
    const { text } = useText()

    const command = `${text.title.toLocaleLowerCase()} --colors '${JSON.stringify(
        colors,
    )}' --positions '${JSON.stringify(
        positions,
    )}' --title-color "${title}" --description-color "${description}"`

    return (
        <DachCommand type="generate" value={`dach generate ${command}`}>
            {command}
        </DachCommand>
    )
}
