import { Tab } from "@headlessui/react"

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <Tab.Group onChange={onChange} selectedIndex={activeTab}>
      <Tab.List className="flex space-x-2">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            className={({ selected }) =>
              `px-4 py-2 rounded-md outline-none transition-colors font-semibold flex items-center gap-2 ${
                selected
                  ? "bg-[var(--blue-600)] text-[var(--button-text)]"
                  : "bg-[var(--background)] border border-[var(--gray-300)] text-[var(--primary-black)] hover:bg-[var(--gray-50)]"
              }`
            }
          >
            {tab.icon && <tab.icon className="w-4 h-4" />}
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  )
} 