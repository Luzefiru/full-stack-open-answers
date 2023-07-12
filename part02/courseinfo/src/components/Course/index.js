import Header from './Header';
import Part from './Part';
import Total from './Total';

const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (prev, currentPart) => prev + currentPart.exercises,
    0
  );

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total sum={totalExercises} />
    </div>
  );
};

export default Course;
