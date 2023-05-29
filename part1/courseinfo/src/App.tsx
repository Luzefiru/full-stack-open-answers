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
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        data={[
          { partName: part1, exerciseCount: exercises1 },
          { partName: part2, exerciseCount: exercises2 },
          { partName: part3, exerciseCount: exercises3 },
        ]}
      />
      <Total exerciseCounts={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
