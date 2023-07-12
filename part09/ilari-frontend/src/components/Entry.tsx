import { DiaryEntry } from '../common/types';

interface EntryProps {
  entry: DiaryEntry;
}

export default function Entry({ entry }: EntryProps) {
  return (
    <div>
      <h3>{entry.date}</h3>
      <div>
        <p>visibility: {entry.visibility}</p>
        <p>weather: {entry.weather}</p>
      </div>
    </div>
  );
}
