import { Diagnosis, HealthCheckEntry } from '../../types';
import { MonitorHeart, Favorite } from '@mui/icons-material';

interface HealthCheckEntryProps {
  diagnoses: Diagnosis[];
  entry: HealthCheckEntry;
}

type possibleColors = 'info' | 'success' | 'warning' | 'error';

function HealthCheckEntryComponent({
  diagnoses,
  entry,
}: HealthCheckEntryProps) {
  const heartColor = ['info', 'success', 'warning', 'error'][
    entry.healthCheckRating
  ];

  return (
    <article className="entry">
      <div>
        {entry.date} <MonitorHeart />
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <Favorite color={heartColor as possibleColors} />
      <div>diagnosed by {entry.specialist}</div>
    </article>
  );
}

export default HealthCheckEntryComponent;
