import React from 'react';
import propTypes from 'prop-types';

const divStyle = { margin: '20px 0px' };

function Anecdote({ anecdote }) {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <div style={divStyle}>has {anecdote.votes} votes</div>
      <div style={divStyle}>for more info see {anecdote.info}</div>
    </div>
  );
}

export default Anecdote;

Anecdote.propTypes = {
  content: propTypes.string.isRequired,
  author: propTypes.string.isRequired,
  info: propTypes.string.isRequired,
  votes: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
};
