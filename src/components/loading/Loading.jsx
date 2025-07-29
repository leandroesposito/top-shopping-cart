import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      Loading...
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loading;
