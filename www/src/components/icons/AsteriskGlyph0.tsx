import tailwindConfig from '../../../tailwind.config'

export function AsteriskGlyph0(
    props: React.SVGProps<SVGSVGElement>,
): JSX.Element {
    return (
        <svg
            width="256"
            height="256"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clip-path="url(#clip0_3_40)">
                <path
                    d="M128 278L128 -22M231.923 53L24.0769 203M8 128L248 128M231.923 203L24.0769 53"
                    stroke-width="4"
                    stroke={tailwindConfig.theme?.extend?.colors.border}
                />
            </g>
            <defs>
                <clipPath id="clip0_3_40">
                    <rect width="256" height="256" />
                </clipPath>
            </defs>
        </svg>
    )
}
