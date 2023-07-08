import React from 'react';
import { Diagnosis, Entry } from '../../types';

interface EntryProps {
  diagnoses: Diagnosis[];
  entry: Entry;
}

function EntryItem({ diagnoses, entry }: EntryProps) {
  const hasEntries =
    entry.diagnosisCodes !== undefined && entry.diagnosisCodes.length > 0;

  const content =
    entry.diagnosisCodes !== undefined && hasEntries ? (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li>
            {code}{' '}
            {diagnoses !== undefined
              ? diagnoses.find((d) => d.code === code)?.name
              : ''}
          </li>
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
