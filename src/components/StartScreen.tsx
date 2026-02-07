import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'

export function StartScreen() {
  const { spin } = useGame()

  return (
    <div className="min-h-screen min-h-dvh bg-black flex flex-col items-center justify-center p-6">
      <motion.button
        type="button"
        onClick={spin}
        className="font-oswald text-2xl md:text-3xl font-black tracking-[0.4em] text-cyber-blue border-2 border-cyber-blue rounded-2xl px-12 py-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-blue/50 select-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileTap={{ scale: 0.98 }}
      >
        SPIN
      </motion.button>
      <p className="font-mono text-sm text-cyber-blue/60 mt-8 tracking-widest">
        TAP TO DOOM
      </p>
    </div>
  )
}
