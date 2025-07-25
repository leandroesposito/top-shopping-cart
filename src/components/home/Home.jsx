import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.title}>SCP</div>
      <div className={styles.description}>Shopping Cart Project</div>
    </div>
  );
}

export default Home;
