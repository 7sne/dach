import React, { useEffect, useRef } from 'react'

export function EditableText({
    text,
    handleUpdateText,
    textProps,
    maxLength = 12,
}: Props): React.ReactElement {
    const textarea = useRef<HTMLDivElement>(null)

    function handleChange(e: React.ChangeEvent<HTMLDivElement>): void {
        if (textarea.current) {
            textarea.current.textContent = e.target.textContent
            handleUpdateText(e.target.textContent ?? '')
        }
    }

    useEffect(() => {
        if (text && textarea.current) textarea.current.textContent = text
    }, [text])

    return (
        <div
            ref={textarea}
            tabIndex={0}
            spellCheck={false}
            aria-multiline="false"
            role="textbox"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={handleChange}
            onKeyDown={(event: React.KeyboardEvent<HTMLParagraphElement>) => {
                if (
                    (event.currentTarget.innerText.length > maxLength ||
                        event.key === 'Enter') &&
                    event.key !== 'Backspace'
                )
                    event.preventDefault()
            }}
            {...textProps}
        />
    )
}

type Props = {
    text: string
    handleUpdateText: (title: string) => void
    maxLength?: number
    textProps?: React.HTMLAttributes<HTMLParagraphElement> & {
        'data-cy'?: string
    }
}
