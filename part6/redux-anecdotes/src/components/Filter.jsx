import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

export default function Filter() {
  const dispatch = useDispatch();
  const inputValue = useSelector(({ filter }) => filter);

  const handleChange = (e) => {
    dispatch(updateFilter(e.target.value));
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label for="filter">Filter</label>
      <input
        type="text"
        id="filter"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
