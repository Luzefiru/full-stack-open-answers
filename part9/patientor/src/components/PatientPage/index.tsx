import { Patient } from '../../types';
import {
  FemaleOutlined,
  MaleOutlined,
  TransgenderOutlined,
} from '@mui/icons-material';
import EntryItem from './EntryItem';
import { useState, useEffect } from 'react';
import { Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

interface PatientPageProps {
  patient: Patient | undefined;
}

function PatientPage({ patient }: PatientPageProps) {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const getDiagnoses = async () => {
      const diagnoses: Diagnosis[] = await diagnosesService.getAllDiagnoses();
      setDiagnoses(diagnoses);
    };
    getDiagnoses();
  }, []);

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
        <EntryItem diagnoses={diagnoses} entry={entry} />
      ))}
    </div>
  );
}

export default PatientPage;
