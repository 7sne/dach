import { AlertCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { DachCommand } from '../components/dach-command'
import { PreviewImage } from '../components/image-expand'
import { ImageGrid } from '../components/image-grid'
import { blurBanner } from '../components/server-side/blur-banner'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { Button } from '../components/ui/button'

const exampleImages = ['elegant', 'lotus', 'flora', 'blaze', 'pearl']

export default async function Home(): Promise<React.ReactElement> {
    const imageElements = await Promise.all(
        exampleImages.map(image => blurBanner(image)),
    )

    return (
        <main className="flex flex-col items-center justify-center max-w-5xl min-h-screen p-8 mx-auto gap-y-8 xl:p-0">
            <PreviewImage />

            <section className="flex flex-col mr-auto sm:w-2/3">
                <h1 className="text-6xl font-extrabold">Dach</h1>
                <h2 className="top-0 mt-4 text-xl font-light text-primary/75">
                    Democratizing the creation of elegant{' '}
                    <br className="hidden sm:block" /> banners for
                    everyone&apos;s project.
                </h2>
                <Button
                    asChild
                    className="w-full px-4 py-3 mt-8 rounded-sm sm:w-3/4 whitespace-nowrap bg-primary text-secondary"
                >
                    <Link href="/toolkit">Generate banner background</Link>
                </Button>
            </section>

            <Alert
                className="py-4 mr-auto text-left sm:w-1/2 cursor-help"
                variant="informative"
            >
                <AlertCircleIcon strokeWidth={1.4} />
                <AlertTitle className="mb-2 ml-2">Disclaimer</AlertTitle>
                <AlertDescription className="ml-2">
                    This project is currently in its early stages of
                    development, and there may be instances where it is either
                    not functioning as intended or experiencing issues.
                </AlertDescription>
            </Alert>

            <section className="w-full mt-12">
                <h3 className="text-xl">Installation</h3>

                <DachCommand
                    type="i"
                    value={`dach add example --colors '["#fafafa"]' --positions '[{"x":0.49618420439786215,"y":0.22918175634846816}]' --title-color "#191919" --description-color "#191919"`}
                >
                    -g dach
                </DachCommand>
            </section>

            <section className="w-full mt-8">
                <h3 className="text-xl">Usage</h3>
                <p className="mt-2 font-light">
                    Dach strength lies in the ability to create themes for it
                    using the{' '}
                    <Link
                        className="underline underline-offset-2"
                        href="/toolkit"
                    >
                        web toolkit
                    </Link>
                    . After you have created a theme, you can use it to generate
                    banners for your projects. There are already predefined
                    themes that you can use if you dont find the need to create
                    your own.
                </p>

                <div className="mt-6">
                    <p>Generate banner using predefined theme:</p>
                    <DachCommand
                        type="generate"
                        value="dach generate -o . -t Title -d Description --theme funk"
                    >
                        -o . -t Title -d Description --theme funk
                    </DachCommand>
                </div>

                <div className="mt-8">
                    {' '}
                    <p>Add new theme:</p>
                    <DachCommand
                        type="add"
                        value={`dach add example --colors '["#fafafa"]' --positions '[{"x":0.49618420439786215,"y":0.22918175634846816}]' --title-color "#191919" --description-color "#191919"`}
                    >
                        example --colors &apos;[&quot;#fafafa&quot;]&apos;
                        --positions &apos;[
                        {'{'}
                        &quot;x&quot;:0.49618420439786215,&quot;y&quot;:0.22918175634846816
                        {'}'}
                        ]&apos; --title-color &quot;#191919&quot;
                        --description-color &quot;#191919&quot;
                    </DachCommand>
                </div>

                <div className="mt-6">
                    {' '}
                    <p>Generate banner using added theme:</p>
                    <DachCommand
                        type="generate"
                        value='dach generate --output "./.github" --title "Example" --description "Banner theme toolkit" --theme example'
                    >
                        --output &quot;./.github&quot; --title
                        &quot;Example&quot; --description &quot;Banner theme
                        toolkit&quot; --theme example --ratio &quot;16:9&quot;
                    </DachCommand>
                </div>
            </section>

            <section className="w-full mt-8">
                <h3 className="text-xl">Examples</h3>
                <div className="relative w-full h-full sm:min-h-[60vh] flex flex-col items-center justify-center mt-24">
                    <ImageGrid data-transform>{...imageElements}</ImageGrid>
                    <div
                        data-transform
                        className="absolute top-0 left-0 hidden w-full h-full xl:block -z-10 mesh-pattern"
                    />
                </div>
            </section>
        </main>
    )
}
