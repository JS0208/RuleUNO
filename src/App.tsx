import { GameProvider, useGame } from '@/context/GameContext'
import { StartScreen } from '@/components/StartScreen'
import { RouletteScreen } from '@/components/RouletteScreen'
import { DecisionScreen } from '@/components/DecisionScreen'
import { ActiveRuleScreen } from '@/components/ActiveRuleScreen'

function AppContent() {
  const { phase } = useGame()

  if (phase === 'ACTIVE') return <ActiveRuleScreen />
  if (phase === 'DECISION') return <DecisionScreen />
  if (phase === 'SPINNING') return <RouletteScreen />
  return <StartScreen />
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}
