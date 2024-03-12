import { MapPin } from '@phosphor-icons/react';
import CityLocation from '../../models/CityLocation';
import styles from './location-item.module.css';

interface LocationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  location: CityLocation;
}

function LocationItem({ location, className }: LocationItemProps) {
  return (
    <div className={`${styles['location']} ${className}`}>
      <MapPin size={32} />
      <div className={styles['location__item__information']}>
        <span className={styles['location__item__city']}>
          {location.name}, {location.countryCode}
        </span>
        <span className={styles['location__item__state']}>
          {location.region}
        </span>
      </div>
    </div>
  );
}

export default LocationItem;
