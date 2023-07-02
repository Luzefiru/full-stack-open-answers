import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function User() {
  const users = useSelector((state) => state.users);
  const { id } = useParams();
  const user = users.find((u) => {
    return u.id === id;
  });

  if (user === undefined) {
    return null;
  }

  return (
    <div className="User">
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
