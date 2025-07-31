import styles from "./Error.module.css";

function Error({ error }) {
  return (
    <div className={styles.error}>
      Error...
      <div className={styles.message}>{error.statusText || error.message}</div>
    </div>
  );
}

export default Error;
