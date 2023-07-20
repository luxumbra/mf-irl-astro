import clsx from 'clsx';
import { motion } from 'framer-motion';

export interface MotionElementProps {
  classes?: string;
  x?: number;
  y?: number;
  repeatable?: boolean;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export const MotionDiv = ({ classes, children, x, y, repeatable, delay, duration }: MotionElementProps) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: repeatable }}
    transition={{ duration, delay }}
  >
    <div className={classes}>{children}</div>
  </motion.div>
);

export const MotionSpan = ({ classes, children, x, y, repeatable, delay, duration }: MotionElementProps) => (
  <motion.span
    className={clsx(classes)}
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: repeatable }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.span>
);

MotionDiv.defaultProps = {
  classes: '',
  x: 0,
  y: 8,
  delay: 0,
  duration: 0.2,
  repeatable: false,
};

MotionSpan.defaultProps = {
  classes: '',
  x: 0,
  y: 8,
  delay: 0,
  duration: 0.2,
  repeatable: false,
};
