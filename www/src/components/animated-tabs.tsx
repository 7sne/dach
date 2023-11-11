import { motion } from 'framer-motion'
import { ReactElement } from 'react'

export function AnimatedTabs({
    tabs,
    activeTab,
    handleUpdateActiveTab,
}: Props): ReactElement {
    return (
        <div className="z-0 flex mb-4 space-x-1 sm:mb-6">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className={`${
                        activeTab === tab.id
                            ? '!text-primary sm:!text-destructive-foreground'
                            : 'text-foreground hover:text-foreground'
                    } relative px-3 py-1.5 text-sm font-normal transition focus-visible:outline-2`}
                    onClick={() => handleUpdateActiveTab(tab.id)}
                >
                    {activeTab === tab.id && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-0 bg-foreground mix-blend-difference"
                            style={{ borderRadius: 9999 }}
                            transition={{
                                type: 'spring',
                                bounce: 0.2,
                                duration: 0.6,
                            }}
                        />
                    )}
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

type Props = {
    activeTab: string
    handleUpdateActiveTab: (id: string) => void
    tabs: { id: string; label: string }[]
}
