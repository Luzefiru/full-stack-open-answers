import React from 'react';
import { EntryWithoutId, HealthCheckRating, Entry } from '../../types';
import { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import patientService from '../../services/patients';

interface AddEntryFormProps {
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  toggleEntryForm: () => void;
  id: string;
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

function AddEntryForm({
  type,
  toggleEntryForm,
  id,
  setEntries,
}: AddEntryFormProps) {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [codes, setCodes] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [rating, setRating] = useState<string>('');

  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');

  console.log(type);

  const notifyError = (str: string) => {
    setError(str);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const handleSubmit = async () => {
    if (!Object.values(HealthCheckRating).includes(Number(rating))) {
      notifyError('Value of healthCheckRating incorrect: ' + Number(rating));
    }

    const payload: any = {
      type,
      description,
      date,
      specialist,
      healthCheckRating: Number(rating),
      discharge: { date: dischargeDate, criteria },
      diagnosisCodes: codes.split(','),
    };

    if (type !== 'HealthCheck') {
      delete payload.healthCheckRating;
    }

    if (type !== 'Hospital') {
      delete payload.discharge;
    }

    const responseData = await patientService.createEntry(id, payload);
    if (typeof responseData === 'string') {
      return notifyError(responseData);
    }
    setEntries((prev) => {
      return prev.concat(responseData);
    });
  };

  const handleCancel = () => {
    toggleEntryForm();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFn: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    setFn(e.target.value);
  };

  return (
    <div>
      {error !== '' ? <Alert severity="error">{error}</Alert> : ''}
      <form
        style={{
          border: '2px dashed black',
          padding: '0px 16px 24px 16px',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '32px',
        }}
      >
        <h3>New entry</h3>
        <TextField
          id="standard-basic"
          label="Description"
          variant="standard"
          value={description}
          onChange={(e) =>
            handleChange(
              e as React.ChangeEvent<HTMLInputElement>,
              setDescription
            )
          }
        />
        <input
          style={{ marginTop: '16px' }}
          id="date"
          value={date}
          type="date"
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<HTMLInputElement>, setDate)
          }
        />
        <TextField
          id="standard-basic"
          label="Specialist"
          variant="standard"
          value={specialist}
          onChange={(e) =>
            handleChange(
              e as React.ChangeEvent<HTMLInputElement>,
              setSpecialist
            )
          }
        />
        {type === 'HealthCheck' ? (
          <TextField
            id="standard-basic"
            label="HealthCheck Rating"
            variant="standard"
            value={rating}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>, setRating)
            }
          />
        ) : (
          ''
        )}
        {type === 'Hospital' ? (
          <>
            <input
              style={{ marginTop: '16px' }}
              id="dischargeDate"
              value={dischargeDate}
              type="date"
              onChange={(e) =>
                handleChange(
                  e as React.ChangeEvent<HTMLInputElement>,
                  setDischargeDate
                )
              }
            />
            <TextField
              id="standard-basic"
              label="Criteria"
              variant="standard"
              value={criteria}
              onChange={(e) =>
                handleChange(
                  e as React.ChangeEvent<HTMLInputElement>,
                  setCriteria
                )
              }
            />
          </>
        ) : (
          ''
        )}
        <TextField
          id="standard-basic"
          label="Diagnosis Codes"
          variant="standard"
          value={codes}
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<HTMLInputElement>, setCodes)
          }
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '32px',
          }}
        >
          <Button onClick={handleCancel} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddEntryForm;
