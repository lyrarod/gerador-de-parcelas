import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader} />
      <div className={styles.loader2} />
      <span className={styles.text}>loading...</span>
    </div>
  );
}
