import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  const chooseNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteIncrement = (selected) => {
    setPoints({
      ...points,
      [selected]: (points[selected] ? points[selected] : 0) + 1,
    });
    console.log(points);
  };

  const getAnecdoteWithMaxVotes = () => {
    const highestVotes = Math.max(...Object.values(points));
    let returnedAnecdote = anecdotes[0];

    // for each key in the points object:
    for (let anecdotesIndex in points) {
      // if the points with the key matches the highestVotes, return the Anecdote associated with it.
      if (points[anecdotesIndex] === highestVotes) {
        returnedAnecdote = anecdotes[anecdotesIndex];
      }
    }

    return returnedAnecdote;
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected] ? points[selected] : 0} votes</div>
      <div>
        <button onClick={() => handleVoteIncrement(selected)}>vote</button>
        <button onClick={() => chooseNextAnecdote()}>next anecdote</button>
      </div>
      <h1>Anecdote With Most Votes</h1>
      {getAnecdoteWithMaxVotes()}
    </div>
  );
};

export default App;
