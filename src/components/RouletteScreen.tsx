import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'

const PLACEHOLDER_TEXTS = [
  '???',
  '...',
  '!!!',
  '룰 결정 중',
]

export function RouletteScreen() {
  const { phase } = useGame()
  const isSpinning = phase === 'SPINNING'

  return (
    <div className="min-h-screen min-h-dvh bg-black flex flex-col items-center justify-center p-6 pointer-events-none select-none">
      <motion.div
        className="font-oswald text-4xl md:text-6xl font-black text-cyber-blue text-center blur-sm"
        key={isSpinning ? 'spin' : 'stop'}
        initial={isSpinning ? { y: -100, opacity: 0 } : false}
        animate={
          isSpinning
            ? {
                y: [ -80, 80, -60, 60, -40, 40, -20, 20, 0 ],
                opacity: [ 0.5, 1, 0.7, 1, 0.8, 1, 0.9, 1, 1 ],
              }
            : {}
        }
        transition={{
          duration: 3,
          ease: [ 0.25, 0.1, 0.25, 1 ],
          repeat: isSpinning ? Infinity : 0,
        }}
      >
        {isSpinning
          ? PLACEHOLDER_TEXTS[Math.floor(Math.random() * PLACEHOLDER_TEXTS.length)]
          : '...'}
      </motion.div>
    </div>
  )
}
