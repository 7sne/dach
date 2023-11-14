import { create } from 'zustand'

export const useSize = create<Store>(set => ({
    ratio: '16:9',
    size: { width: 3000, height: 1685 },
    writeRatio: ratio => set({ ratio }),
    writeSize: size => set({ size, ratio: null }),
}))

type Store = {
    ratio: string | null
    writeRatio: (ratio: string | null) => void

    size: { width: number; height: number } | null
    writeSize: (size: { width: number; height: number } | null) => void
}
