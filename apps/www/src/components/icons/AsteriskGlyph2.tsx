import { ReactElement, SVGProps } from 'react'

import tailwindConfig from '../../../tailwind.config'

export function AsteriskGlyph2(props: SVGProps<SVGSVGElement>): ReactElement {
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
                d="M10 9.99999L246 246M10 246L246 10"
                stroke-width="4"
                stroke={tailwindConfig.theme.extend.colors.border}
            />
        </svg>
    )
}
