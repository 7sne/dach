'use client'

import { ReactElement, ReactNode } from 'react'

import { CopyContextProvider } from '../store/copy-context'
import { Command } from './command'
import { CopyToClipboard } from './copy-to-clipboard'

export function DachCommand({
    program,
    argument,
    options,
    children,
}: Props): ReactElement {
    const toCopy = `${program} ${argument} ${options}`

    return (
        <CopyContextProvider>
            {(copiedValue, copyToClipboard) => {
                return (
                    <Command
                        className="mt-2 border border-t"
                        onClick={() => copyToClipboard(toCopy)}
                    >
                        <Command.Text>
                            ▲{' '}
                            <span className="font-bold text-emerald-400">
                                {program}
                            </span>{' '}
                            <span className="font-bold text-pink-400">
                                {argument}
                            </span>{' '}
                            {children}
                        </Command.Text>
                        <CopyToClipboard
                            text={toCopy}
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
    //                                     v-- Preserve type autocompletion.
    argument: 'add' | 'generate' | (string & {})
    program: 'dach' | (string & {})
    options: string
    children: ReactNode
}
