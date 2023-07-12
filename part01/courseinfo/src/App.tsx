const Header = (props: { course: string }) => {
  return <h1>{props.course}</h1>;
};

const Part = (props: { name: string; exercises: number }) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props: {
  parts: { name: string; exercises: number }[];
}): any => {
  return props.parts.map((e) => {
    return <Part name={e.name} exercises={e.exercises} />;
  });
};

const Total = (props: { parts: { name: string; exercises: number }[] }) => {
  let totalExercises: number = 0;
  props.parts.forEach((part) => (totalExercises += part.exercises));

  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
