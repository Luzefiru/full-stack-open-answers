import { Diagnosis, HospitalEntry } from '../../types';
import { Vaccines } from '@mui/icons-material';

interface HospitalEntryProps {
  diagnoses: Diagnosis[];
  entry: HospitalEntry;
}

function HospitalEntryComponent({ diagnoses, entry }: HospitalEntryProps) {
  return (
    <article className="entry">
      <div>
        {entry.date} <Vaccines />
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>diagnosed by {entry.specialist}</div>
    </article>
  );
}

export default HospitalEntryComponent;
