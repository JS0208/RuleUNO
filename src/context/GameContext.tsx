import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { AppPhase, GameRule } from '@/types'
import { useRuleEngine } from '@/hooks/useRuleEngine'
import { useWakeLock, useWakeLockWithVisibility } from '@/hooks/useWakeLock'
import {
  initAudioOnFirstInteraction,
  playClick,
  playConfirm,
  playDeactivate,
  playSpinTick,
  playStop,
  playAlarm,
} from '@/utils/sound'
import { vibrateTap, vibrateSpinTick, vibrateTierResult } from '@/utils/haptic'

type GameContextValue = {
  phase: AppPhase
  currentRule: GameRule | null
  spin: () => void
  applyRule: () => void
  discardRule: () => void
  resetActive: () => void
  longPressProgress: number
  isLongPressing: boolean
  startLongPress: () => void
  cancelLongPress: () => void
}

const GameContext = createContext<GameContextValue | null>(null)

const SPIN_DURATION_MS = 3000
const LONG_PRESS_MS = 2000

export function GameProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>('IDLE')
  const [currentRule, setCurrentRule] = useState<GameRule | null>(null)
  const [longPressProgress, setLongPressProgress] = useState(0)
  const [isLongPressing, setIsLongPressing] = useState(false)

  const { getRandomRule } = useRuleEngine()
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock()
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const spinTickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const longPressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const longPressStartRef = useRef<number>(0)

  const handleVisibilityChange = useWakeLockWithVisibility(requestWakeLock, phase === 'ACTIVE')

  useEffect(() => {
    if (phase !== 'ACTIVE') return
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [phase, handleVisibilityChange])

  const spin = useCallback(() => {
    initAudioOnFirstInteraction()
    playClick()
    vibrateTap()
    setPhase('SPINNING')
    setCurrentRule(null)

    const tick = () => {
      playSpinTick()
      vibrateSpinTick()
    }
    tick()
    const interval = setInterval(tick, 120)
    spinTickIntervalRef.current = interval

    spinTimeoutRef.current = setTimeout(() => {
      if (spinTickIntervalRef.current) {
        clearInterval(spinTickIntervalRef.current)
        spinTickIntervalRef.current = null
      }
      playStop()
      const rule = getRandomRule()
      setCurrentRule(rule)
      setPhase('DECISION')
    }, SPIN_DURATION_MS)
  }, [getRandomRule])

  const applyRule = useCallback(() => {
    if (!currentRule) return
    initAudioOnFirstInteraction()
    if (currentRule.tier === 3) playAlarm()
    else playConfirm(currentRule.tier)
    vibrateTierResult(currentRule.tier)
    requestWakeLock().then(() => {
      setPhase('ACTIVE')
    })
  }, [currentRule, requestWakeLock])

  const discardRule = useCallback(() => {
    setCurrentRule(null)
    setPhase('IDLE')
  }, [])

  const resetActive = useCallback(async () => {
    playDeactivate()
    await releaseWakeLock()
    setCurrentRule(null)
    setPhase('IDLE')
  }, [releaseWakeLock])

  const startLongPress = useCallback(() => {
    setIsLongPressing(true)
    setLongPressProgress(0)
    longPressStartRef.current = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - longPressStartRef.current
      const p = Math.min(1, elapsed / LONG_PRESS_MS)
      setLongPressProgress(p)
      if (p >= 1) {
        if (longPressIntervalRef.current) {
          clearInterval(longPressIntervalRef.current)
          longPressIntervalRef.current = null
        }
        resetActive()
        setIsLongPressing(false)
        setLongPressProgress(0)
      }
    }, 50)
    longPressIntervalRef.current = interval
  }, [resetActive])

  const cancelLongPress = useCallback(() => {
    if (longPressIntervalRef.current) {
      clearInterval(longPressIntervalRef.current)
      longPressIntervalRef.current = null
    }
    setIsLongPressing(false)
    setLongPressProgress(0)
  }, [])

  const value: GameContextValue = {
    phase,
    currentRule,
    spin,
    applyRule,
    discardRule,
    resetActive,
    longPressProgress,
    isLongPressing,
    startLongPress,
    cancelLongPress,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
