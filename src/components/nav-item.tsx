import type React from "react"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  isActive?: boolean
}

export default function NavItem({ icon, label, onClick, isActive }: NavItemProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg py-2 px-1 cursor-pointer transition-colors
        ${isActive ? "bg-purple-500" : "bg-purple-600 hover:bg-purple-500"}`}
      onClick={onClick}
    >
      <div className="text-yellow-400">{icon}</div>
      <span className="text-yellow-400 text-xs mt-1">{label}</span>
    </div>
  )
}

