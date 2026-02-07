import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import type { RuleTier } from '@/types'
import { GlitchText } from './GlitchText'

const tierColors: Record<RuleTier, { border: string; text: string }> = {
  1: { border: 'border-neon-green', text: 'text-neon-green' },
  2: { border: 'border-neon-yellow', text: 'text-neon-yellow' },
  3: { border: 'border-neon-red', text: 'text-neon-red' },
}

export function DecisionScreen() {
  const { currentRule, applyRule, discardRule } = useGame()

  if (!currentRule) return null

  const tierStyle = tierColors[currentRule.tier]

  return (
    <div className="min-h-screen min-h-dvh bg-black flex flex-col items-center justify-center p-6">
      <motion.div
        className={`text-center border-4 ${tierStyle.border} rounded-xl p-8 mb-12 max-w-lg`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className={`font-oswald text-3xl md:text-5xl font-black ${tierStyle.text} mb-4`}>
          <GlitchText>{currentRule.title}</GlitchText>
        </p>
        <p className="font-mono text-base text-white/80">{currentRule.description}</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <motion.button
          type="button"
          onClick={applyRule}
          className={`font-oswald text-xl font-bold tracking-widest py-4 px-8 rounded-xl border-2 ${tierStyle.border} ${tierStyle.text} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
          whileTap={{ scale: 0.98 }}
        >
          APPLY
        </motion.button>
        <motion.button
          type="button"
          onClick={discardRule}
          className="font-oswald text-xl font-bold tracking-widest py-4 px-8 rounded-xl border-2 border-cyber-blue text-cyber-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          whileTap={{ scale: 0.98 }}
        >
          DISCARD
        </motion.button>
      </div>
    </div>
  )
}
