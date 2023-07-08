import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import { Work } from '@mui/icons-material';

interface OccupationalEntryProps {
  diagnoses: Diagnosis[];
  entry: OccupationalHealthcareEntry;
}

function OccupationalEntry({ diagnoses, entry }: OccupationalEntryProps) {
  return (
    <article className="entry">
      <div>
        {entry.date} <Work /> {entry.employerName}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>diagnosed by {entry.specialist}</div>
    </article>
  );
}

export default OccupationalEntry;
