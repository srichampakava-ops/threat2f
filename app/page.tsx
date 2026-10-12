import Image from "next/image"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { UploadPanel } from "@/components/dashboard/upload-panel"

export default function Page() {
  return (
    <div className="flex h-dvh overflow-hidden bg-[#05070f] font-sans text-white">
      <Sidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Image
          src="/images/bottom-wave.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-bottom opacity-45"
        />
        <Topbar />
        <main className="relative flex-1 overflow-y-auto px-6 pb-6 pt-[clamp(16px,3.3vh,28px)] lg:pl-14 lg:pr-[70px]">
          <p className="text-[14px] font-medium tracking-[0.35em] text-white/75">UPLOAD &amp; ANALYZE</p>
          <h1 className="mt-[clamp(4px,1vh,10px)] text-balance text-[clamp(32px,7vh,58px)] font-bold leading-tight tracking-tight">
            Analyze Your SOC Report
          </h1>
          <p className="mt-[clamp(4px,1vh,10px)] max-w-[940px] text-[clamp(15px,2.4vh,20px)] leading-relaxed text-white/90">
            Upload security reports and automatically generate detection rules, map MITRE ATT&amp;CK techniques and
            create SOAR playbooks.
          </p>
          <div className="mt-[clamp(14px,4vh,36px)]">
            <UploadPanel />
          </div>
        </main>
      </div>
    </div>
  )
}
