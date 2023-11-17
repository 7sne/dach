'use client'

import { ReactElement, ReactNode } from 'react'

import { CopyContextProvider } from '../store/copy-context'
import { Command } from './command'
import { CopyToClipboard } from './copy-to-clipboard'

export function DachCommand({ type, value, children }: Props): ReactElement {
    return (
        <CopyContextProvider>
            {(copiedValue, copyToClipboard) => {
                return (
                    <Command
                        className="mt-2 border border-t"
                        onClick={() =>
                            copyToClipboard(
                                `dach generate --output "./.github" --title "Example" --description "Banner theme toolkit" --theme example`,
                            )
                        }
                    >
                        <Command.Text>
                            ▲{' '}
                            <span className="font-bold text-emerald-400">
                                dach
                            </span>{' '}
                            <span className="font-bold text-pink-400">
                                {type}
                            </span>{' '}
                            {children}
                        </Command.Text>
                        <CopyToClipboard
                            text={value}
                            wasJustCopied={Boolean(copiedValue)}
                            copyToClipboard={copyToClipboard}
                        />
                    </Command>
                )
            }}
        </CopyContextProvider>
    )
}

type Props = {
    //                                 v-- Preserve type autocompletion.
    type: 'add' | 'generate' | (string & {})
    value: string
    children: ReactNode
}
