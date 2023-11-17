'use client'

import Image from 'next/image'
import { ReactElement } from 'react'
import { create } from 'zustand'

import { Dialog, DialogContent } from './ui/dialog'

export function ImageExpand({
    image,
    children,
}: ImageExpandProps): ReactElement {
    const { writeImageToPreview } = usePreviewImage()

    return (
        <>
            <div
                className="w-full xl:w-[300px] xl:h-[167] aspect-[16/10] relative shadow-lg overflow-hidden border border-border/30 rounded-lg cursor-pointer hover:scale-[1.02] filter hover:brightness-110 transition-transform duration-300"
                onClick={() => writeImageToPreview(image)}
            >
                {children}
            </div>
        </>
    )
}

type ImageExpandProps = {
    image: string
    children: ReactElement
}

const usePreviewImage = create<Store>(set => ({
    imageToPreview: null,
    removeImageToPreview: () => set({ imageToPreview: null }),
    writeImageToPreview: image => set({ imageToPreview: image }),
}))

type Store = {
    imageToPreview: string | null
    removeImageToPreview: () => void
    writeImageToPreview: (image: string | null) => void
}

export function PreviewImage(): ReactElement {
    const { imageToPreview, writeImageToPreview } = usePreviewImage()

    return (
        <Dialog
            open={imageToPreview !== null}
            onOpenChange={() => writeImageToPreview(null)}
        >
            <DialogContent className="p-0 overflow-hidden border-none rounded-none">
                <div className="absolute w-1/2 -right-1/4 -top-1/4 h-1/2 blur-2xl bg-secondary/30" />
                {imageToPreview && (
                    <Image
                        src={imageToPreview}
                        width={3000}
                        height={1675}
                        alt="banner preview"
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}
