export type Severity = "HIGH" | "MEDIUM"

export type Finding = {
  id: string
  title: string
  severity: Severity
  sigma: string
  yara: string
  siemRule: string
  playbook: string
  explanation: string
  evidence: string[]
  attack: string
  recommendations: string[]
}

export const findings: Finding[] = [
  {
    id: "f-001",
    title: "Suspicious PowerShell download cradle",
    severity: "HIGH",
    sigma: `title: Suspicious PowerShell Download Cradle\nlogsource:\n  product: windows\n  category: process_creation\ndetection:\n  selection:\n    Image|endswith: '\\\\powershell.exe'\n    CommandLine|contains:\n      - 'IEX'\n      - 'DownloadString'\n  condition: selection\nlevel: high`,
    yara: `rule Suspicious_PowerShell_Download {\n  meta:\n    description = "PowerShell download cradle"\n  strings:\n    $iex = "IEX" nocase\n    $download = "DownloadString" nocase\n  condition:\n    2 of them\n}`,
    siemRule: `index=windows EventCode=1 Image="*\\\\powershell.exe"\n(CommandLine="*IEX*" OR CommandLine="*DownloadString*")\n| stats count by host, user, CommandLine`,
    playbook: `1. Enrich the alert with endpoint and identity context.\n2. Block the source indicator at the firewall. [RISKY]\n3. Isolate the affected endpoint from the network. [RISKY]\n4. Notify the SOC channel and open a ticket.\n5. Preserve evidence for analyst review.`,
    explanation: "This finding combines PowerShell process creation with an in-memory download pattern. The command line indicators are highly associated with initial access and execution activity.",
    evidence: ["powershell.exe launched with IEX", "DownloadString observed in command line", "Unsigned child process from Office application"],
    attack: "T1059.001 · PowerShell; T1105 · Ingress Tool Transfer",
    recommendations: ["Constrain PowerShell language mode", "Enable script block logging", "Review the parent process and user session"],
  },
  {
    id: "f-002",
    title: "Unusual privileged login burst",
    severity: "MEDIUM",
    sigma: `title: Unusual Privileged Login Burst\nlogsource:\n  product: windows\n  service: security\ndetection:\n  selection:\n    EventID: 4624\n    TargetUserName|endswith: '$'\n  condition: selection\nlevel: medium`,
    yara: "",
    siemRule: `source=WinEventLog:Security EventCode=4624\n| bin _time span=5m\n| stats dc(Account_Name) as accounts by src_ip, _time\n| where accounts > 5`,
    playbook: "",
    explanation: "A short-lived burst of privileged authentication events was observed from a single source. Validate whether the activity matches an approved administrative task.",
    evidence: ["Nine privileged accounts authenticated within five minutes", "Source IP is new for this environment"],
    attack: "T1078 · Valid Accounts",
    recommendations: ["Confirm the change window with IT", "Review MFA and source IP reputation"],
  },
]

export const platforms = {
  siem: ["Wazuh", "Splunk", "Elastic", "Microsoft Sentinel", "IBM QRadar"],
  soar: ["Shuffle", "n8n", "Splunk SOAR", "Tines", "Microsoft Sentinel Playbooks"],
} as const

export type Platform = string

export const fieldsFor = (platform: Platform) => {
  const common = (labels: string[]) => labels.map((label) => ({ label, secret: /password|token|key|secret/i.test(label) }))
  if (platform === "Wazuh") return common(["URL", "Username", "Password"])
  if (platform === "Splunk") return common(["URL", "Token"])
  if (platform === "Elastic") return common(["Kibana URL", "API key"])
  if (platform === "Microsoft Sentinel" || platform === "Microsoft Sentinel Playbooks") return common(["Tenant ID", "Client ID", "Client secret", "Subscription ID", "Resource group", "Workspace"])
  if (platform === "IBM QRadar") return common(["URL", "SEC token"])
  if (platform === "Tines") return common(["URL", "API key", "Team ID"])
  return common(["URL", "API key"])
}

export const downloadText = (filename: string, contents: string) => {
  const blob = new Blob([contents], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export const selectedFinding = findings[0]

export const deploymentResults = [
  { target: "Splunk", status: "Created", detail: "Detection rule created and enabled." },
  { target: "Tines", status: "Validated only", detail: "Connection validated; playbook export is ready." },
]
