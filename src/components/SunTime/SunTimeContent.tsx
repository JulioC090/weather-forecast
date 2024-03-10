import { SunDim, SunHorizon } from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import { SunPeriod } from '.';
import { formatHourAndMinutes } from '../../utils/formatDate';
import styles from './sun-time.module.css';

interface SunTimeProps {
  sunPeriod: SunPeriod;
}

function SunTimeContent({ sunPeriod }: SunTimeProps) {
  const sunTimePathRef = useRef<HTMLDivElement>(null);

  const isDay = Date.now() > sunPeriod.sunrise && Date.now() < sunPeriod.sunset;

  const progress = isDay
    ? (Date.now() - sunPeriod.sunrise) / (sunPeriod.sunset - sunPeriod.sunrise)
    : 1 +
      (Date.now() - sunPeriod.sunrise) / (sunPeriod.sunset - sunPeriod.sunrise);

  useEffect(() => {
    sunTimePathRef.current?.style.setProperty(
      '--progress',
      progress.toString(),
    );
  }, [sunTimePathRef, progress]);

  return (
    <div className={styles['sun-time']}>
      <div className={styles['sun-time__text']}>
        <SunDim size={24} />
        <span>{formatHourAndMinutes(new Date(sunPeriod.sunrise))}</span>
        <span className={styles['sun-time__secondary-text']}>Nascer</span>
      </div>
      <div ref={sunTimePathRef} className={styles['sun-time__path']}>
        {isDay ? (
          <div className={styles['sun-time__sun']}></div>
        ) : (
          <div className={styles['sun-time__moon']}></div>
        )}
      </div>
      <div className={styles['sun-time__text']}>
        <SunHorizon size={24} />
        <span>{formatHourAndMinutes(new Date(sunPeriod.sunset))}</span>
        <span className={styles['sun-time__secondary-text']}>Pôr</span>
      </div>
    </div>
  );
}

export default SunTimeContent;
