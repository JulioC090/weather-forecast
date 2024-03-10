import Card from '../../layout/Card';
import Loader from '../../primitives/Loader';
import SunTimeContent from './SunTimeContent';
import SunTimeFallback from './SunTimeFallback';

export type SunPeriod = {
  sunrise: number;
  sunset: number;
};

interface SunTimeProps {
  sunPeriod: SunPeriod | undefined;
}

function SunTime({ sunPeriod }: SunTimeProps) {
  return (
    <Card>
      <h2>Nascer e Pôr do Sol</h2>
      <Loader
        dependency={sunPeriod}
        fallback={<SunTimeFallback />}
        content={<SunTimeContent sunPeriod={sunPeriod!} />}
      />
    </Card>
  );
}

export default SunTime;
