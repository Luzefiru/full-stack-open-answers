import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive = (good / (good + neutral + bad)) * 100;

  return (
    <div className="Statistics">
      <h1>Statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  );
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
        <button onClick={handleIncrement(good, setGood)}>good</button>
        <button onClick={handleIncrement(neutral, setNeutral)}>neutral</button>
        <button onClick={handleIncrement(bad, setBad)}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
