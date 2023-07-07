import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry } from './common/types';
import diaryServices from './services/diaries.service';
import Entries from './components/Entries';
import NewEntryForm from './components/NewEntryForm';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const getDiaryEntries = async () => {
      const entries = await diaryServices.getAllEntries();
      setEntries(entries);
    };

    getDiaryEntries();
  }, []);

  if (entries.length === 0) {
    return <div>Fetching entries...</div>;
  }

  const createEntry = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
    const newEntry = await diaryServices.createEntry(entry);
    setEntries(entries.concat(newEntry));
    return newEntry;
  };

  return (
    <div className="App">
      <NewEntryForm createEntry={createEntry} />
      <Entries entries={entries} />
    </div>
  );
}

export default App;
