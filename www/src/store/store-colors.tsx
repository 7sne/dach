import { create } from 'zustand'

export const useColors = create<Store>(set => ({
    colors: ['#fafafa'],
    writeColor: (index, color) =>
        set(state => {
            const colors = [...state.colors]
            colors[index] = color
            return { colors }
        }),

    textColor: { title: '#191919', description: '#191919' },
    writeTitleColor: color =>
        set(state => ({ textColor: { ...state.textColor, title: color } })),
    writeDescriptionColor: color =>
        set(state => ({
            textColor: { ...state.textColor, description: color },
        })),
}))

type Store = {
    colors: string[]
    writeColor: (index: number, color: any) => void

    textColor: { title: string; description: string }
    writeTitleColor: (color: string) => void
    writeDescriptionColor: (color: string) => void
}
