import Image from "next/image"

const navItems = [
  ["Overview", "/overview"],
  ["Upload & Analyze", "/"],
  ["Threat Intelligence", "/threat-intelligence"],
  ["Detection Rules", "/detection-rules"],
  ["MITRE ATT&CK", "/mitre-attack"],
  ["SOAR Automations", "/soar-automations"],
  ["Deployments", "/deployments"],
  ["Audit Logs", "/audit-logs"],
  ["Settings", "/settings"],
]

export function Sidebar() {
  return (
    <aside className="relative hidden h-full w-[300px] shrink-0 flex-col overflow-hidden border-r border-white/5 bg-[#05070f] lg:flex">
      <Image
        src="/images/sidebar-wave.png"
        alt=""
        fill
        priority
        sizes="300px"
        className="pointer-events-none object-cover object-bottom opacity-75"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#05070f] via-[#05070f]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#05070f]/80 to-transparent" />

      <div className="relative flex items-center gap-2 px-5 pt-4">
        <Image src="/images/logo.png" alt="" width={56} height={56} className="size-14 mix-blend-screen" />
        <div className="leading-tight">
          <p className="flex items-center gap-4 text-[21px] font-bold tracking-tight">
            <span className="text-white">
              Threat<span className="text-[#7b5cff]">Bridge</span>
            </span>
            <span className="h-5 w-0.5 bg-white" aria-hidden="true" />
          </p>
          <p className="mt-1 text-[13px] font-medium text-white/90">AI Powered SOC Automation</p>
        </div>
      </div>

      <nav aria-label="Main navigation" className="relative mt-[clamp(12px,2.5vh,28px)] px-2.5">
        <ul className="flex flex-col gap-[clamp(0px,0.6vh,6px)]">
          {navItems.map(([item, href], i) => {
            const active = i === 0
            return (
              <li key={item}>
                <a
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "relative flex h-[clamp(44px,6.5vh,54px)] items-center gap-6 rounded-lg bg-gradient-to-r from-[#1f1d72] to-[#24237a] pl-6 text-[15px] font-medium text-white shadow-[0_0_24px_rgba(79,70,229,0.25)] before:absolute before:inset-y-1 before:left-0 before:w-1 before:rounded-full before:bg-[#3b4cff]"
                      : "flex h-[clamp(40px,6.2vh,52px)] items-center gap-6 pl-7 text-[15px] text-white/90 transition-colors hover:text-white"
                  }
                >
                  {active ? (
                    <span className="h-3 w-2 rounded-[2px] bg-gradient-to-r from-[#3b82f6] to-[#6366f1]" aria-hidden="true" />
                  ) : (
                    <span className="size-1.5 rounded-full bg-[#4f7cff]" aria-hidden="true" />
                  )}
                  {item}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="relative mt-auto px-[52px] pb-7">
        <p className="text-xl font-bold leading-tight text-white">
          Smarter
          <br />
          Security.
          <br />
          <span className="text-[#22a8ff]">Faster Response.</span>
        </p>
        <span className="mt-2 block h-0.5 w-14 rounded-full bg-[#7c5cff]" aria-hidden="true" />
      </div>
    </aside>
  )
}
