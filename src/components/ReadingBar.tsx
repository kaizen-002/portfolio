import styles from "./ReadingBar.module.css";

// A purple progress bar along the bottom of the screen, like the one in every Short.
// Driven by a CSS scroll timeline, no JavaScript. Browsers without scroll timelines just don't show it.
export function ReadingBar() {
  return <div className={styles.bar} aria-hidden="true" />;
}
