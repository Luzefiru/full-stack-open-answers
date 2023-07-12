import Entry from './Entry';
import { DiaryEntry } from '../common/types';

interface EntriesProps {
  entries: DiaryEntry[];
}

export default function Entries({ entries }: EntriesProps) {
  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((e) => (
        <Entry key={e.id} entry={e} />
      ))}
    </div>
  );
}
