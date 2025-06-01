// import { AnimatePresence } from 'framer-motion'
import { AnimatePresence } from 'motion/react'
import { FiCheck, FiLoader, FiX } from 'react-icons/fi'
// import { motion } from 'framer-motion'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

type StateType = {
  success: boolean
  message: string
} | null

const ButtonSubmit = ({ isPending, state }: { isPending: boolean; state: StateType }) => {
  const [localState, setLocalState] = useState<StateType>(null)

  useEffect(() => {
    if (state) {
      setLocalState(state)
      const timer = setTimeout(() => setLocalState(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [state])

  const getButtonColor = () => {
    if (isPending) return 'bg-indigo-300'
    if (localState?.success) return 'bg-green-500'
    if (localState?.success === false) return 'bg-red-500'
    return 'bg-indigo-500 hover:bg-indigo-600'
  }

  const getButtonText = () => {
    if (isPending) return 'Wysyłanie...'
    if (localState?.success) return 'Wysłano!'
    if (localState?.success === false) return 'Wystąpił błąd...'
    return 'Wyślij wiadomość!'
  }

  return (
  <motion.button
    type="submit"
    disabled={isPending}
    className={`relative rounded-md px-6 py-3 font-medium text-white transition-colors w-full mt-2
      ${getButtonColor()} 
      ${!isPending ? 'hover:scale-105 active:scale-95' : ''}
    `}
    whileHover={!isPending ? { scale: 1.05 } : undefined}
    whileTap={!isPending ? { scale: 0.95 } : undefined}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.3
    }}
  >
    <div className="flex items-center gap-2 justify-center">
      <AnimatePresence mode="wait">
        <StatusIcon key={String(localState?.success)} isPending={isPending} state={localState} />
      </AnimatePresence>
      <span>{getButtonText()}</span>
    </div>
  </motion.button>
  )
}

const StatusIcon = ({ isPending, state }: { isPending: boolean; state: StateType }) => {
  const iconProps = {
    className: 'text-xl',
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  }

  return (
    <>
      {isPending && (
        <motion.div {...iconProps}>
          <FiLoader className="animate-spin" />
        </motion.div>
      )}

      {state?.success && (
        <motion.div {...iconProps}>
          <FiCheck />
        </motion.div>
      )}

      {state?.success === false && (
        <motion.div {...iconProps}>
          <FiX />
        </motion.div>
      )}
    </>
  )
}

export default ButtonSubmit
