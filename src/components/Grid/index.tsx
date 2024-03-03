import styles from './grid.module.css';

interface GridProps {
  children: React.ReactNode;
}

function Grid({ children }: GridProps) {
  return <div className={styles['grid']}>{children}</div>;
}

export default Grid;
