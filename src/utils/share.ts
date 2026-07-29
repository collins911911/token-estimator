export interface ShareableState {
  prompt: string
  modelId: string
  requestsPerDay: number
}

export function encodeStateToURL(state: ShareableState): string {
  const params = new URLSearchParams({
    p: btoa(encodeURIComponent(state.prompt)),
    m: state.modelId,
    r: state.requestsPerDay.toString(),
  })
  return `${window.location.origin}${window.location.pathname}?${params.toString()}#tool`
}

export function decodeStateFromURL(): ShareableState | null {
  try {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('p')
    const m = params.get('m')
    const r = params.get('r')

    if (!p || !m || !r) return null

    return {
      prompt: decodeURIComponent(atob(p)),
      modelId: m,
      requestsPerDay: parseInt(r, 10),
    }
  } catch {
    return null
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}