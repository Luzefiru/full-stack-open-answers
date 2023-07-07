import { CoursePart } from '../shared/types';

interface TotalProps {
  courseParts: CoursePart[];
}

export default function Total({ courseParts }: TotalProps) {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}
