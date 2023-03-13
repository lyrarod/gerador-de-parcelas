import styles from "./loading.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.loader} />
      <em className={styles.text}>loading...</em>
    </>
  );
}
