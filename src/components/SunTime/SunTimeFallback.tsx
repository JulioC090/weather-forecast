import { SunDim, SunHorizon } from '@phosphor-icons/react';
import Skeleton from 'react-loading-skeleton';
import styles from './sun-time.module.css';

function SunTimeFallback() {
  return (
    <div className={styles['sun-time']}>
      <div className={styles['sun-time__text']}>
        <SunDim size={24} />
        <Skeleton count={1} width={44} />
        <span className={styles['sun-time__secondary-text']}>Nascer</span>
      </div>
      <Skeleton containerClassName="full-width" className="full-height" />
      <div className={styles['sun-time__text']}>
        <SunHorizon size={24} />
        <Skeleton count={1} width={44} />
        <span className={styles['sun-time__secondary-text']}>Pôr</span>
      </div>
    </div>
  );
}

export default SunTimeFallback;
