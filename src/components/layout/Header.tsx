import { SidebarTrigger } from "@/components/ui/sidebar"

export const Header = () => {
  return (
    <header className="h-16 border-b bg-white/50 backdrop-blur-sm">
      <div className="flex h-full items-center px-4 gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold text-navy">AI Job Application Platform</h1>
      </div>
    </header>
  )
}