const Header = (props: { course: string }) => {
  return <h1>{props.course}</h1>;
};

const Part = (props: { name: string; exerciseCount: number }) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  );
};

const Content = (props: {
  data: { partName: string; exerciseCount: number }[];
}): any => {
  return props.data.map((e) => {
    return <Part name={e.partName} exerciseCount={e.exerciseCount} />;
  });
};

const Total = (props: { exerciseCounts: number[] }) => {
  return (
    <p>
      Number of exercises {props.exerciseCounts.reduce((acc, cur) => acc + cur)}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        data={[
          { partName: part1.name, exerciseCount: part1.exercises },
          { partName: part2.name, exerciseCount: part2.exercises },
          { partName: part3.name, exerciseCount: part3.exercises },
        ]}
      />
      <Total
        exerciseCounts={[part1.exercises, part2.exercises, part3.exercises]}
      />
    </div>
  );
};

export default App;
