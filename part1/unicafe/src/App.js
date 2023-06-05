import { useState } from 'react';

const StatisticLine = ({ statistic, value }) => {
  return (
    <div>
      {statistic} {value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive = (good / (good + neutral + bad)) * 100;

  return (
    <div className="Statistics">
      <h1>Statistics</h1>
      {good + neutral + bad === 0 ? (
        'No feedback given'
      ) : (
        <>
          <StatisticLine statistic={'good'} value={good} />
          <StatisticLine statistic={'neutral'} value={neutral} />
          <StatisticLine statistic={'bad'} value={bad} />
          <StatisticLine statistic={'all'} value={all} />
          <StatisticLine statistic={'average'} value={average} />
          <StatisticLine statistic={'positive'} value={positive} />
        </>
      )}
    </div>
  );
};

const Button = ({ handleClick, children }) => {
  return <button onClick={handleClick}>{children}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = (prevValue, setValue) => {
    return () => setValue(prevValue + 1);
  };

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={handleIncrement(good, setGood)}>good</Button>
        <Button handleClick={handleIncrement(neutral, setNeutral)}>
          neutral
        </Button>
        <Button handleClick={handleIncrement(bad, setBad)}>bad</Button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
