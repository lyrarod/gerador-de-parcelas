"use client";

import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader} />
      <em className={styles.text}>loading...</em>
    </div>
  );
}
