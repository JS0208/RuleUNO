import { useCallback, useRef } from 'react'

type WakeLockSentinel = { release: () => Promise<void> }
type NavigatorWithWakeLock = Navigator & {
  wakeLock?: { request: (type: 'screen') => Promise<WakeLockSentinel> }
}

function getWakeLock(): { request: (type: 'screen') => Promise<WakeLockSentinel> } | undefined {
  return (navigator as NavigatorWithWakeLock).wakeLock
}

export function useWakeLock() {
  const sentinelRef = useRef<WakeLockSentinel | null>(null)

  const isSupported = typeof navigator !== 'undefined' && !!getWakeLock()

  const request = useCallback(async (): Promise<boolean> => {
    const wl = getWakeLock()
    if (!isSupported || !wl) return false
    try {
      sentinelRef.current = await wl.request('screen')
      return true
    } catch {
      return false
    }
  }, [isSupported])

  const release = useCallback(async (): Promise<void> => {
    if (sentinelRef.current) {
      try {
        await sentinelRef.current.release()
      } catch {
        // ignore
      }
      sentinelRef.current = null
    }
  }, [])

  return { request, release, isSupported }
}

export function useWakeLockWithVisibility(request: () => Promise<boolean>, isActive: boolean) {
  const requestRef = useRef(request)
  const isActiveRef = useRef(isActive)
  requestRef.current = request
  isActiveRef.current = isActive

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible' && isActiveRef.current) {
      requestRef.current()
    }
  }, [])

  return handleVisibilityChange
}
