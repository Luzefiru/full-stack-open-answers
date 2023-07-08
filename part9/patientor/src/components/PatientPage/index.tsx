import { Patient } from '../../types';
import {
  FemaleOutlined,
  MaleOutlined,
  TransgenderOutlined,
} from '@mui/icons-material';
import EntryItem from './EntryItem';

interface PatientPageProps {
  patient: Patient | undefined;
}

function PatientPage({ patient }: PatientPageProps) {
  const genderIcon: JSX.Element =
    patient?.gender === 'female' ? (
      <FemaleOutlined />
    ) : patient?.gender === 'male' ? (
      <MaleOutlined />
    ) : (
      <TransgenderOutlined />
    );

  if (patient === undefined) {
    return (
      <div>
        <h1>Error 404: Patient not found</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 style={{ display: 'flex', gap: '8px' }}>
        {patient.name}
        {genderIcon}
      </h1>

      <section>
        <div>ssn: {patient?.ssn ?? 'no ssn available'}</div>
        <div>occupation: {patient?.occupation}</div>
      </section>

      <h2>entries</h2>
      {patient?.entries.length === 0 ? 'no entries found' : ''}
      {patient?.entries.map((entry) => (
        <EntryItem entry={entry} />
      ))}
    </div>
  );
}

export default PatientPage;
