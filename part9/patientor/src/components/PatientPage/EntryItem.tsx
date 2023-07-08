import { Diagnosis, Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import './EntryItem.css';

interface EntryProps {
  diagnoses: Diagnosis[];
  entry: Entry;
}

function EntryItem({ diagnoses, entry }: EntryProps) {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry diagnoses={diagnoses} entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntry diagnoses={diagnoses} entry={entry} />;
    case 'Hospital':
      return <HospitalEntry diagnoses={diagnoses} entry={entry} />;
    default:
      const _exhaustiveAssert: never = entry;
      return _exhaustiveAssert;
  }
}

export default EntryItem;
