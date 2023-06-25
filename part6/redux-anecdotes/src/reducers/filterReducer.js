const reducer = (state = '', action) => {
  if (action.type === 'UPDATE_FILTER') {
    return action.payload;
  } else {
    return state;
  }
};

export const updateFilter = (str) => {
  return {
    type: 'UPDATE_FILTER',
    payload: str,
  };
};

export default reducer;
