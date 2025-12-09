// FILE: src/components/Profile.js
import React from 'react';
import { auth } from '../firebase';

export default function Profile() {
  const user = auth.currentUser;

  if (!user) return <p>Please sign in.</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>UID:</strong> {user.uid}</p>
    </div>
  );
}



