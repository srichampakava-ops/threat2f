import { Bell, ChevronDown, Search } from "lucide-react"

export function Topbar() {
  return (
    <header className="relative z-10 flex h-[72px] shrink-0 items-center justify-end gap-6 bg-[#080b16]/90 px-6 lg:pl-10">
      <div className="mr-auto flex flex-1 justify-center lg:pl-[11%]">
        <label className="flex h-11 w-full max-w-[592px] items-center gap-3 rounded-lg border border-white/10 bg-[#04060d] px-5">
          <Search className="size-5 text-white" strokeWidth={2} aria-hidden="true" />
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search reports, IOCs, techniques..."
            className="w-full bg-transparent text-[15px] text-white placeholder:text-white/85 focus:outline-none"
          />
        </label>
      </div>

      <button type="button" className="relative text-white" aria-label="Notifications">
        <Bell className="size-6" strokeWidth={1.75} />
        <span className="absolute -top-0.5 right-0 size-2 rounded-full bg-[#ff2d2d]" aria-hidden="true" />
      </button>

      <span className="h-9 w-px bg-white/10" aria-hidden="true" />

      <button type="button" className="flex items-center gap-3 text-white" aria-label="Account menu for Champ">
        <span className="flex size-10 items-center justify-center rounded-full bg-[#1d3fb8] text-lg font-semibold">
          C
        </span>
        <span className="text-[17px] font-medium">Champ</span>
        <ChevronDown className="ml-3 size-5" aria-hidden="true" />
      </button>
    </header>
  )
}
