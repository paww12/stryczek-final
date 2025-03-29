'use client'
import { motion } from 'framer-motion'

const SVG = () => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.35,
        delay: delay,
        ease: 'easeInOut',
      },
    }),
  }

  const circleVariants = {
    hidden: { fillOpacity: 0, scale: 0 },
    visible: {
      fillOpacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full px-2 max-w-96 lg:max-w-[500px]"
      viewBox="0 0 487 289"
      fill="none"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M450 146L451.619 261.293"
        stroke="#C470C6"
        strokeWidth="30"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0.5}
      />
      <motion.path
        d="M471.436 183.725L353.885 173.441"
        stroke="#C470C6"
        strokeWidth="30"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0.5}
      />
      <motion.path
        d="M465.32 35.6284L353.885 173.441"
        stroke="#C470C6"
        strokeWidth="30"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0.5}
      />

      {/* Light purple lines */}
      <motion.path
        d="M117.225 145.768L125.805 267.631"
        stroke="#D2C5FA"
        strokeWidth="30"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0.7}
      />
      <motion.path
        d="M135.035 186.904L17.9148 201.285"
        stroke="#D2C5FA"
        strokeWidth="30"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0.7}
      />
      <motion.path
        d="M98.2621 43.3156L17.9148 201.285"
        stroke="#D2C5FA"
        strokeWidth="30"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0.7}
      />

      {/* Red 404 number */}
      <motion.path
        d="M157.339 152.257C150.768 77.1569 185.137 12.8034 234.103 8.51943C283.07 4.23543 328.091 61.6431 334.661 136.743C341.232 211.843 306.863 276.197 257.897 280.481C208.93 284.765 163.909 227.357 157.339 152.257ZM308.063 139.07C295 59 271.949 46.3148 237.672 49.3136C203.396 52.3124 179.338 97.3598 183.937 149.93C183.937 217 234.103 254.5 257.897 250C303.5 241.375 312.662 191.64 308.063 139.07Z"
        fill="#D16262"
        variants={circleVariants}
      />
    </motion.svg>
  )
}

export default SVG
