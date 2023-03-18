import styles from "./btnLoading.module.css";

export function BtnLoading({
  color = "inherit",
  size = "1rem",
}: {
  color?: string;
  size?: string;
}) {
  return (
    <div
      className={styles.loader}
      style={{ borderColor: color, width: size, height: size }}
    />
  );
}
