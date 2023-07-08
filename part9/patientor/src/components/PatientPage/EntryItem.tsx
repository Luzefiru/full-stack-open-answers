import React from 'react';
import { Entry } from '../../types';

interface EntryProps {
  entry: Entry;
}

function EntryItem({ entry }: EntryProps) {
  const hasEntries =
    entry.diagnosisCodes !== undefined && entry.diagnosisCodes.length > 0;
  const content =
    entry.diagnosisCodes !== undefined && hasEntries ? (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li>{code}</li>
        ))}
      </ul>
    ) : (
      ''
    );

  return (
    <div>
      <div style={{ margin: '8px 0' }}>
        {entry.date} <em>{entry.description}</em>
      </div>
      {content}
    </div>
  );
}

export default EntryItem;
