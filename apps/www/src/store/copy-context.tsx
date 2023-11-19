'use client'

import { createContext, ReactElement, useEffect, useState } from 'react'

const CopyContext = createContext<{}>({})

export function CopyContextProvider({
    children,
}: CopyContextProviderProps): ReactElement {
    const [copiedValue, setCopiedValue] = useState<string>()

    function handleCopyToClipboard(content: string): void {
        console.log(content)
        setCopiedValue(content)

        // Copy text to the clipboard.
        const el = document.createElement(`textarea`)
        el.value = content
        el.setAttribute(`readonly`, ``)
        el.style.position = `absolute`
        el.style.left = `-9999px`
        document.body.appendChild(el)
        el.select()
        document.execCommand(`copy`)
        document.body.removeChild(el)
    }

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>
        if (copiedValue) {
            timeout = setTimeout(() => setCopiedValue(undefined), 2_000)
        }
        return () => clearTimeout(timeout)
    }, [copiedValue])

    return (
        <CopyContext.Provider
            value={{
                copiedValue,
                setCopiedValue,
            }}
        >
            {children(copiedValue, handleCopyToClipboard)}
        </CopyContext.Provider>
    )
}

type CopyContextProviderProps = {
    children: (
        copiedValue: string | undefined,
        copyToClipboard: (text: string) => void,
    ) => ReactElement
}
