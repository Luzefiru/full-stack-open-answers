import { CoursePart } from '../shared/types';

interface ContentProps {
  courseParts: CoursePart[];
}

export default function Content({ courseParts }: ContentProps): JSX.Element {
  return (
    <>
      {courseParts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
}
