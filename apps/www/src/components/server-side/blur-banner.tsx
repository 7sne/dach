import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'

export async function blurBanner(imageName: string) {
    const src = `${imageName}.png`
    const buffer = await fs.readFile(path.join('./public', src))
    const { base64 } = await getPlaiceholder(buffer)

    return (
        <div
            data-img-url={`/${src}`}
            className="relative w-full h-full overflow-hidden rounded-lg"
        >
            <Image
                fill
                alt="image"
                placeholder="blur"
                src={`/${src}`}
                blurDataURL={base64}
            />
        </div>
    )
}
