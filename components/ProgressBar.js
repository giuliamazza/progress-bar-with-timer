import { useEffect, useRef, useState } from 'react'
import styles from './ProgressBar.module.css'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const formatTime = (time) => {
  return new Date(time).toISOString().substr(11, 8).replace(/^00\:/, '')
}

export default function ProgressBar({
  duration,
  add,
  color
}) {
  const intervalRef = useRef();
  const limit = useMotionValue((duration + add) * 60);
  const progress = useMotionValue(0);
  const secondsLeft = useTransform([limit, progress], ([l, p]) => {
    return l - p;
  });
  const progressBarWidth = useTransform(
    [limit, progress], 
    ([l, p]) => `${(1 - (p / l)) * 100}%`
  );

  const [countdown, setCountdown] = useState(() => {
    return formatTime((duration + add) * 60 * 1000)
  });
  useEffect(
    () => secondsLeft.onChange((value) => {
      setCountdown(formatTime(value * 1000));
    }),
    []
  );

  useEffect(() => {
    progress.set(0);
    limit.set((duration + add)  * 60);
  }, [duration]);

  useEffect(() => {
    limit.set((duration + add)  * 60);
  }, [add]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const p = progress.get()
      if (p < limit.get()) {
        progress.set(p + 1)
      }
    }, 1000);
    () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.barcontainer}>
        <motion.div className={styles.bar} style={{
          backgroundColor: color, 
          width: progressBarWidth
        }}>
        </motion.div>
      </div>
      <div className={styles.text}>
        <span>{countdown}</span>
      </div>
    </div>
  )
}