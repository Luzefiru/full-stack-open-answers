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
  content: propTypes.string,
  author: propTypes.string,
  info: propTypes.string,
  votes: propTypes.number,
  id: propTypes.number,
};
