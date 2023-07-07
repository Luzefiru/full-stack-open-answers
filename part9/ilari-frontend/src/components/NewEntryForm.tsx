import { AxiosError } from 'axios';
import {
  NewDiaryEntry,
  DiaryEntry,
  Visibility,
  Weather,
} from '../common/types';
import { useState } from 'react';

interface NewEntryFormProps {
  createEntry: (entry: NewDiaryEntry) => Promise<DiaryEntry>;
}

export default function NewEntryForm({ createEntry }: NewEntryFormProps) {
  const [date, setDate] = useState<string | ''>('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [comment, setComment] = useState<string | ''>('');
  const [notification, setNotification] = useState<string | undefined>(
    undefined
  );

  const notify = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (weather !== '' && visibility !== '') {
        const newEntry = await createEntry({
          date,
          visibility,
          weather,
          comment,
        });

        console.log('created', newEntry);
      } else {
        throw new Error("Error: Fields can't be left empty!");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response !== undefined) {
        notify(err.response.data);
      } else {
        notify(JSON.stringify(err));
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <h4 style={{ color: 'red' }}>{notification}</h4>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label>
          date
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              setDate(e.currentTarget.value);
            }}
          />
        </label>
        <label>
          visibility
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              setVisibility(e.currentTarget.value as Visibility);
            }}
          />
        </label>
        <label>
          weather
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              setWeather(e.currentTarget.value as Weather);
            }}
          />
        </label>
        <label>
          comment
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              setComment(e.currentTarget.value);
            }}
          />
        </label>
        <button type="submit" style={{ width: 'max-content' }}>
          add
        </button>
      </form>
    </div>
  );
}
