import styles from './page.module.css';
import { ScoreboardExample } from './components/ScoreboardExample/ScoreboardExample';

export default function Home() {
  return (
    <div className={styles.page}>
      <ScoreboardExample />
    </div>
  );
}
