import { create } from 'zustand'
import { DEFAULT_RGB_POSITONS } from '../lib/mesh-gradient-canvas-const'

export const useRgbPositions = create<Store>(set => ({
    positions: [DEFAULT_RGB_POSITONS[0]],
    writePosition: (index, position) => {
        set(state => {
            const positions = [...state.positions]
            positions[index] = position
            return { ...state, positions }
        })
    },
    writePositions: positions => set({ positions }),
}))

type Store = {
    positions: { x: number; y: number }[]
    writePosition: (index: number, position: { x: number; y: number }) => void
    writePositions: (positions: { x: number; y: number }[]) => void
}
