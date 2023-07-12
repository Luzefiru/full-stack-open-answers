import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeUsers } from '../../../redux/User.slice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UsersView() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  console.log(users);

  return (
    <div className="UsersView">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersView;
