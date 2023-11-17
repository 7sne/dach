'use client'

import { ReactElement } from 'react'

import { useSize } from '../store/store-sizing'
import { useText } from '../store/store-text'
import { DachCommand } from './dach-command'

export function GenerateBannerCommand(): ReactElement {
    const {
        text: { title, description },
    } = useText()
    const { ratio, size } = useSize()

    let command = `--output "./.github" --title "${title}" --description "${description}" --theme ${title.toLocaleLowerCase()}`

    // Add sizing arguments
    command = ratio
        ? `${command} --ratio "${ratio}"`
        : `${command} --dimensions "${size!.width}x${size!.height}"`

    return (
        <DachCommand type="generate" value={`dach add ${command}`}>
            {command}
        </DachCommand>
    )
}
