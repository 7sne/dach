import { HTMLAttributes, ReactElement, ReactNode } from 'react'

import { cn } from '../lib/utils'

function CommandContainer({
    children,
    ...rest
}: CommandContainerProps): ReactElement | null {
    return children.length > 1 ? (
        <div
            {...rest}
            className={cn(
                `relative flex items-center justify-between w-full py-6 mx-auto border-b border-x border-secondary cursor-copy ${rest.className}}`,
            )}
        >
            <code className="font-mono px-2 mr-24 text-md overflow-hidden whitespace-nowrap w-[1024px] text-ellipsis">
                {children[0]}
            </code>
            <div className="flex items-center justify-center bg-background h-full border-l min-w-[60px] absolute right-0 group hover:bg-secondary hover:cursor-pointer">
                {children[1]}
            </div>
        </div>
    ) : null
}

type CommandContainerProps = {
    children: ReactElement[]
} & HTMLAttributes<HTMLDivElement>

function Text({ children }: TextProps) {
    return (
        <code className="font-mono px-6 font-light text-md overflow-hidden whitespace-nowrap w-[1024px] text-ellipsis mr-12">
            {children}
        </code>
    )
}

type TextProps = {
    children: ReactElement | ReactNode | ReactElement[]
}

export const Command = Object.assign(CommandContainer, {
    Text,
})
