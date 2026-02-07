export type RuleTier = 1 | 2 | 3

export interface GameRule {
  id: string
  title: string
  description: string
  tier: RuleTier
  icon?: string
}

export type AppPhase = 'IDLE' | 'SPINNING' | 'DECISION' | 'ACTIVE'
