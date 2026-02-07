/**
 * Haptic feedback via Navigator.vibrate.
 * Graceful no-op when not supported (e.g. iOS Safari).
 */

const hasVibrate = typeof navigator !== 'undefined' && 'vibrate' in navigator

export function vibrateTap(): void {
  if (hasVibrate) {
    try {
      navigator.vibrate(10)
    } catch {
      // ignore
    }
  }
}

export function vibrateSpinTick(): void {
  if (hasVibrate) {
    try {
      navigator.vibrate(30)
    } catch {
      // ignore
    }
  }
}

export function vibrateTierResult(tier: 1 | 2 | 3): void {
  if (!hasVibrate) return
  try {
    if (tier === 1) navigator.vibrate(100)
    else if (tier === 2) navigator.vibrate(300)
    else navigator.vibrate([500, 100, 500])
  } catch {
    // ignore
  }
}
