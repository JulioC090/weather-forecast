import { SunDim, SunHorizon } from '@phosphor-icons/react';
import Card from '../Card';

import styles from './sun-time.module.css';

function SunTime() {
  return (
    <Card>
      <h2>Nascer e Pôr do Sol</h2>
      <div className={styles['sun-time']}>
        <div className={styles['sun-time__text']}>
          <SunDim size={24} />
          <span>6:20</span>
          <span className={styles['sun-time__secondary-text']}>Nascer</span>
        </div>
        <div className={styles['sun-time__path']}>
          <div className={styles['sun-time__sun']}></div>
        </div>
        <div className={styles['sun-time__text']}>
          <SunHorizon size={24} />
          <span>18:20</span>
          <span className={styles['sun-time__secondary-text']}>Pôr</span>
        </div>
      </div>
    </Card>
  );
}

export default SunTime;
