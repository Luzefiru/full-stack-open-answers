import { CoursePart } from '../shared/types';

interface PartProps {
  partData: CoursePart;
}

export default function Part({ partData }: PartProps): JSX.Element {
  const assertNever = (arg: never): never => {
    throw new Error('Unexpected argument', arg);
  };

  const generatePartContent = (partData: CoursePart): JSX.Element => {
    switch (partData.kind) {
      case 'basic':
        return (
          <>
            <h3>
              {partData.name} {partData.exerciseCount}
            </h3>
            <em>{partData.description}</em>
          </>
        );
      case 'group':
        return (
          <>
            <h3>
              {partData.name} {partData.exerciseCount}
            </h3>
            <em>project exercises {partData.groupProjectCount}</em>
          </>
        );
      case 'background':
        return (
          <>
            <h3>
              {partData.name} {partData.exerciseCount}
            </h3>
            <em>{partData.description}</em>
            <p>submit to {partData.backgroundMaterial}</p>
          </>
        );
      case 'special':
        return (
          <>
            <h3>
              {partData.name} {partData.exerciseCount}
            </h3>
            <em>{partData.description}</em>
            <p>required skills: {partData.requirements.join(', ')}</p>
          </>
        );

      default:
        return assertNever(partData);
    }
  };

  return <p>{generatePartContent(partData)}</p>;
}
