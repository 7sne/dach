import { ReactElement } from 'react'

export function BannerRatioTabs({
    tabs,
    activeTab,
    handleUpdateActiveTab,
}: Props): ReactElement {
    return (
        <div className="z-0 flex mb-4 space-x-1 sm:mb-6">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    data-cy={`banner-ratio-tab-${tab.id}`}
                    className={`${
                        activeTab === tab.id
                            ? 'text-foreground scale-105'
                            : 'text-foreground/60 hover:text-foreground/80 scale-95'
                    } relative px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2`}
                    onClick={() => handleUpdateActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

type Props = {
    activeTab: string
    tabs: { id: string; label: string }[]
    handleUpdateActiveTab: (id: string) => void
}
