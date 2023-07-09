import { Patient } from '../../types';
import {
  FemaleOutlined,
  MaleOutlined,
  TransgenderOutlined,
} from '@mui/icons-material';
import EntryItem from './EntryItem';
import { useState, useEffect } from 'react';
import { Diagnosis, Entry } from '../../types';
import diagnosesService from '../../services/diagnoses';
import { Button } from '@mui/material';
import AddEntryForm from '../AddEntryForm';

interface PatientPageProps {
  patient: Patient | undefined;
}

function PatientPage({ patient }: PatientPageProps) {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showingEntryForm, setShowingEntryForm] = useState<boolean>(false);
  const [entries, setEntries] = useState<Entry[]>([]);

  const toggleEntryForm = () => {
    setShowingEntryForm(!showingEntryForm);
  };

  useEffect(() => {
    setEntries(patient?.entries as Entry[]);
  }, [patient]);

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

      {showingEntryForm ? (
        <AddEntryForm
          toggleEntryForm={toggleEntryForm}
          id={patient.id}
          setEntries={setEntries}
        />
      ) : (
        <Button variant="contained" color="primary" onClick={toggleEntryForm}>
          Add New Entry
        </Button>
      )}

      <section style={{ marginTop: '24px' }}>
        <div>ssn: {patient?.ssn ?? 'no ssn available'}</div>
        <div>occupation: {patient?.occupation}</div>
      </section>

      <h2>entries</h2>
      {entries?.length === 0 ? 'no entries found' : ''}
      {entries?.map((entry) => (
        <EntryItem diagnoses={diagnoses} entry={entry} />
      ))}
    </div>
  );
}

export default PatientPage;
