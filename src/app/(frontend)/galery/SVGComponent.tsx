import { motion, useTransform } from 'framer-motion'
import { MotionValue } from 'framer-motion'

const SVGComponent = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0])
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.85, 1], ['0', '0%', '-10%'])

  return (
    <motion.svg
      style={{ opacity, translateY }}
      className="w-screen fixed top-1/4 left-0 h-full"
      viewBox="0 0 566 307"
      fill="none"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M-1 1C85.4 86.5865 87 133.979 87 153.476C87 167.974 74 205.768 38 180.972C2 156.176 1.66667 128.647 6 117.982C10.3461 105.983 28.4867 93.5854 54.8559 107.983C81.2252 122.381 111.987 169.973 119 192.97C124.667 212.967 133 240.762 181 235.963C229 231.164 266 205.468 281.5 181.972C292.833 160.975 308.4 119.181 266 99.9844C223.6 80.7874 211.5 118.482 220 140.478C225.226 154.001 230 164.774 246 167.974C262 171.173 312 157.309 335 149.977C353.333 144.311 392.4 139.978 402 167.974C411.6 195.969 434.167 205.502 453.5 215.5C463 220.413 482.9 224.365 492.5 215.966C504.5 205.468 520 187.471 502.5 161.475C485 135.479 458.5 131.979 452.5 149.977C446.5 167.974 449 180.972 461 198.469C473 215.966 502.5 218.966 502.5 256.46C502.5 293.954 513.5 316.45 531.5 320.45C545.9 323.649 560.5 312.118 566 305.952"
        stroke="black"
        style={{ pathLength }}
      />
    </motion.svg>
  )
}

export default SVGComponent
