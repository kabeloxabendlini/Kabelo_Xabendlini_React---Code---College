import React from 'react'
import useFetch from './useFetch'

const Users = () => {
  const users = useFetch("https://jsonplaceholder.typicode.com/users");

  if (!users || !Array.isArray(users)) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((el) => (
        <li key={el.id}>{el.name}</li>
      ))}
    </ul>
  );
};

export default Users;
