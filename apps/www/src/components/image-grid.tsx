import { HTMLAttributes, ReactElement } from 'react'

import { cn } from '../lib/utils'
import { ImageExpand } from './image-expand'

export function ImageGrid({
    children,
    className,
    ...rest
}: Props): ReactElement {
    return (
        <div
            {...rest}
            className={cn(
                'flex flex-wrap sm:grid sm:grid-cols-2 gap-2 xl:absolute w-full xl:w-8/12 xl:p-2',
                className,
            )}
        >
            {children.map((element, index) => {
                return (
                    <ImageExpand
                        key={index}
                        image={element.props['data-img-url']}
                    >
                        {element}
                    </ImageExpand>
                )
            })}
        </div>
    )
}

type Props = {
    children: ReactElement[]
} & HTMLAttributes<HTMLDivElement>
