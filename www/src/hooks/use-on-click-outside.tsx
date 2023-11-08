import { RefObject, useEffect } from 'react'

type Handler = (event: MouseEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
): void {
    function handleClick(event: MouseEvent): void {
        if (ref.current && !ref.current.contains(event.target as Node))
            handler(event)
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
}
