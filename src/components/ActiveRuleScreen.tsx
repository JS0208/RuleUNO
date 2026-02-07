import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import type { RuleTier } from '@/types'

const tierStyles: Record<
  RuleTier,
  { border: string; text: string; shadow: string; bg: string }
> = {
  1: {
    border: 'border-neon-green',
    text: 'text-neon-green',
    shadow: 'shadow-neon-green',
    bg: 'bg-neon-green/5',
  },
  2: {
    border: 'border-neon-yellow',
    text: 'text-neon-yellow',
    shadow: 'shadow-neon-yellow',
    bg: 'bg-neon-yellow/5',
  },
  3: {
    border: 'border-neon-red',
    text: 'text-neon-red',
    shadow: 'shadow-neon-red',
    bg: 'bg-neon-red/5',
  },
}

export function ActiveRuleScreen() {
  const { currentRule, longPressProgress, isLongPressing, startLongPress, cancelLongPress } =
    useGame()

  if (!currentRule) return null

  const style = tierStyles[currentRule.tier]
  const isJoker = currentRule.id === 'event_joker'

  const tierShadowColor =
    currentRule.tier === 1 ? '#39FF14' : currentRule.tier === 2 ? '#FFE700' : '#FF003C'

  return (
    <>
      <motion.div
        className="fixed inset-0 z-10 pointer-events-none"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          backgroundColor: tierShadowColor,
        }}
      />
      <motion.div
        className={`min-h-screen min-h-dvh flex flex-col items-center justify-center p-4 md:p-8 border-[10px] ${style.border} ${style.bg}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.12, delay: 0.05 }}
      style={{
        boxShadow: `0 0 20px ${tierShadowColor}40, 0 0 60px ${tierShadowColor}20`,
      }}
    >
      <motion.div
        className="flex-1 flex flex-col items-center justify-center text-center w-full"
        animate={{
          opacity: [ 0.85, 1, 0.85 ],
        }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.p
          className={`font-oswald font-black ${style.text} w-full max-w-4xl`}
          style={{
            fontSize: 'clamp(2rem, 10vw, 6rem)',
            lineHeight: 1.1,
            textShadow: isJoker
              ? '0 0 10px #39FF14, 0 0 20px #FFE700, 0 0 30px #FF003C'
              : undefined,
          }}
          animate={
            currentRule.tier === 3 || isJoker
              ? {
                  opacity: [ 0.9, 1, 0.9 ],
                  scale: [ 1, 1.02, 1 ],
                }
              : {}
          }
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        >
          {currentRule.title}
        </motion.p>
        <p className="font-mono text-lg md:text-xl text-white/90 mt-6 max-w-2xl">
          {currentRule.description}
        </p>
      </motion.div>

      <div className="w-full max-w-xs pb-8 pt-4">
        <motion.button
          type="button"
          onPointerDown={startLongPress}
          onPointerUp={cancelLongPress}
          onPointerLeave={cancelLongPress}
          className="font-mono text-sm tracking-widest text-white/50 border border-white/30 rounded-lg py-3 px-4 w-full focus:outline-none"
          whileTap={{ scale: 0.98 }}
        >
          HOLD TO RESET
        </motion.button>
        {isLongPressing && (
          <motion.div
            className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full bg-cyber-blue"
              initial={{ width: '0%' }}
              animate={{ width: `${longPressProgress * 100}%` }}
              transition={{ duration: 0.05 }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
    </>
  )
}
