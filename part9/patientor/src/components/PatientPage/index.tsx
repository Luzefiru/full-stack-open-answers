import { Patient } from '../../types';
import {
  FemaleOutlined,
  MaleOutlined,
  TransgenderOutlined,
} from '@mui/icons-material';

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
    </div>
  );
}

export default PatientPage;
