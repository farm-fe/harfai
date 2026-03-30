import styles from './index.module.css';

export function HomePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Welcome to Harfai</h1>
      <p className={styles.tagline}>
        Full-stack self-evolution framework powered by FarmFE and Harness Engineering.
      </p>
      <nav className={styles.nav}>
        <a href="/users" className={styles.link}>
          View Users →
        </a>
      </nav>
    </main>
  );
}

export default HomePage;
