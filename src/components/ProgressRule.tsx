import styles from "./ProgressRule.module.css";

// The divider is the Lorenesia progress bar: a lavender fill on a dark track, like the bar at the bottom of every Short.
export function ProgressRule({ value }: { value: number }) {
  return (
    <div className={`page ${styles.wrap}`} aria-hidden="true">
      <div className={styles.track}>
        <div className={styles.fill} style={{ transform: `scaleX(${value / 100})` }} />
      </div>
    </div>
  );
}
