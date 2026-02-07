import { motion } from 'framer-motion'

const glitchVariants = {
  initial: { x: 0, y: 0, opacity: 1 },
  glitch: {
    x: [ 0, -3, 3, -2, 2, 0 ],
    y: [ 0, 2, -2, 1, -1, 0 ],
    opacity: [ 1, 0.8, 1, 0.9, 1, 1 ],
    transition: { duration: 0.3, times: [ 0, 0.15, 0.3, 0.45, 0.6, 1 ] },
  },
}

type Props = {
  children: React.ReactNode
  className?: string
}

export function GlitchText({ children, className = '' }: Props) {
  return (
    <motion.span
      className={className}
      variants={glitchVariants}
      initial="initial"
      animate="glitch"
    >
      {children}
    </motion.span>
  )
}
