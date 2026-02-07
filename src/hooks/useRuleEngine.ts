import { useCallback } from 'react'
import { getRandomRule } from '@/data/rules'
import type { GameRule } from '@/types'

export function useRuleEngine() {
  const getRandom = useCallback((): GameRule => getRandomRule(), [])
  return { getRandomRule: getRandom }
}
