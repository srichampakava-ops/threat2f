"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"

const siemOptions = ["Splunk", "Microsoft Sentinel", "IBM QRadar", "Elastic SIEM", "Google Chronicle"]
const soarOptions = ["Splunk SOAR", "Cortex XSOAR", "Microsoft Sentinel Playbooks", "Swimlane", "Tines"]

function SelectField({ id, label, placeholder, options }: { id: string; label: string; placeholder: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-[clamp(6px,1.2vh,10px)]">
      <label htmlFor={id} className="pl-2 text-[17px] font-medium text-white">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          className="h-[clamp(44px,6.6vh,56px)] w-full appearance-none rounded-md border border-[#6d3fe0] bg-[#070915] pl-6 pr-12 text-[17px] text-white/90 shadow-[0_0_12px_rgba(109,63,224,0.25)] focus:outline-none focus:ring-2 focus:ring-[#7c5cff]"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#070915]">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-5 top-1/2 size-6 -translate-y-1/2 text-white" aria-hidden="true" />
      </div>
    </div>
  )
}

export function UploadPanel() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  return (
    <form className="flex flex-col gap-[clamp(12px,2.6vh,24px)]" onSubmit={(e) => { e.preventDefault(); router.push("/results") }}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload a report file"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files[0]
          if (file) setFileName(file.name)
        }}
        className={`relative h-[clamp(180px,31vh,265px)] cursor-pointer overflow-hidden rounded-xl border bg-[#04060e] p-2 shadow-[0_0_18px_rgba(139,92,246,0.35),inset_0_0_30px_rgba(59,130,246,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c5cff] ${
          dragging ? "border-[#a78bfa]" : "border-[#7c3aed]"
        }`}
      >
        <Image
          src="/images/upload-wave.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="pointer-events-none object-cover object-bottom"
        />
        <div className="relative flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#5b5bf0]/80 text-center">
          <p className="text-[clamp(18px,2.6vh,22px)] font-semibold text-white">Drag and drop your file here</p>
          <p className="mt-2 text-[clamp(14px,2.1vh,17px)] text-white/90">
            {fileName ? `Selected: ${fileName}` : "or click to browse (PDF, DOCX, TXT, LOG)"}
          </p>
          <span className="mt-[clamp(10px,2vh,16px)] flex h-[clamp(38px,5.8vh,48px)] w-[214px] items-center justify-center rounded-md border border-[#7c5cff] bg-[#110f35]/90 text-[16px] font-medium text-white shadow-[0_0_10px_rgba(124,92,255,0.3)]">
            Browse Files
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt,.log"
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-7">
        <SelectField id="siem" label="Select Your SIEM" placeholder="Choose SIEM..." options={siemOptions} />
        <SelectField id="soar" label="Select Your SOAR" placeholder="Choose SOAR..." options={soarOptions} />
      </div>

      <button
        type="submit"
        className="h-[clamp(46px,7.2vh,60px)] w-full rounded-lg border border-[#6b7cff] bg-gradient-to-r from-[#5a1fb8] via-[#3a1f8f] to-[#24206e] text-[19px] font-semibold text-white shadow-[0_0_18px_rgba(99,102,241,0.45)] transition-[filter] hover:brightness-125"
      >
        Analyze Report
      </button>
    </form>
  )
}
