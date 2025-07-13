"use client";
import { circOut, motion } from "motion/react";

const Template = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: circOut }}
      animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
};

export default Template;