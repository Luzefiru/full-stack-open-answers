import { CoursePart } from '../shared/types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

export default function Content({ courseParts }: ContentProps): JSX.Element {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} partData={part} />
      ))}
    </>
  );
}
