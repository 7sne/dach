import { ReactElement, SVGProps } from 'react'

import tailwindConfig from '../../../tailwind.config'

export function AsteriskGlyph1(props: SVGProps<SVGSVGElement>): ReactElement {
    return (
        <svg
            width="256"
            height="256"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M128 8V248M9.5 246.5L246.5 9.5M8 128H248M9.5 9.49999L246.5 246.5"
                stroke-width="4"
                stroke={tailwindConfig.theme.extend.colors.border}
            />
        </svg>
    )
}
