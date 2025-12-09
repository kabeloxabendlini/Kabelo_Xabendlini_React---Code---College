// FILE: src/components/Projects.js
import React from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

export default function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'projects'),
      where('uid', '==', auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, snapshot =>
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );

    return () => unsub();
  }, []);

  async function addProject(e) {
    e.preventDefault();
    if (!name.trim()) return;

    await addDoc(collection(db, 'projects'), {
      name: name.trim(),
      uid: auth.currentUser.uid,
      createdAt: new Date(),
    });

    setName('');
  }

  return (
    <div>
      <h2>Your Projects (second collection)</h2>

      <form onSubmit={addProject} className="add-project">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Project name"
        />
        <button type="submit">Create</button>
      </form>

      <ul>
        {projects.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
