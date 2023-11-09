import { ReactElement } from 'react'
import { useSize } from '../store/store-sizing'
import { useText } from '../store/store-text'
import { CopyToClipboard } from './copy-to-clipboard'
import { GeneratedCliCommand } from './generated-cli-command'

export function GenerateBannerCliCommand(): ReactElement {
    const {
        text: { title, description },
    } = useText()
    const { ratio, size } = useSize()
    console.log(title, description)

    let command = `--output "./.github" --title "${title}" --description "${description}" --theme ${title.toLocaleLowerCase()}`

    // Add sizing arguments
    command = ratio
        ? `${command} --ratio "${ratio}"`
        : `${command} --dimensions "${size!.width}x${size!.height}"`

    return (
        <GeneratedCliCommand className="border-b">
            <GeneratedCliCommand.Text>
                ▲ <span className="font-bold text-emerald-400">dach</span>{' '}
                <span className="font-bold text-pink-400">generate</span>{' '}
                {command}
            </GeneratedCliCommand.Text>
            <CopyToClipboard text={`dach generate ${command}`} />
        </GeneratedCliCommand>
    )
}
