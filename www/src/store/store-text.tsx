import { create } from 'zustand'

export const useText = create<Store>(set => ({
    text: { title: 'dach', description: 'Banner theme toolkit' },
    writeTitle: title => {
        set(state => ({ text: { ...state.text, title } }))
    },
    writeDescription: description => {
        set(state => ({ text: { ...state.text, description } }))
    },
}))

type Store = {
    text: { title: string; description: string }
    writeTitle: (title: string) => void
    writeDescription: (description: string) => void
}
