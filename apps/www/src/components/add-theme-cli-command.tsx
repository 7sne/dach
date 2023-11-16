import { ReactElement } from 'react'
import { useColors } from '../store/store-colors'
import { useRgbPositions } from '../store/store-rgb-positions'
import { useText } from '../store/store-text'
import { CopyToClipboard } from './copy-to-clipboard'
import { GeneratedCliCommand } from './generated-cli-command'

export function AddThemeCliCommand(): ReactElement {
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
        <GeneratedCliCommand className="border border-t">
            <GeneratedCliCommand.Text>
                ▲ <span className="font-bold text-emerald-400">dach</span>{' '}
                <span className="font-bold text-pink-400">add</span> {command}
            </GeneratedCliCommand.Text>
            <CopyToClipboard text={`dach add ${command}`} />
        </GeneratedCliCommand>
    )
}
