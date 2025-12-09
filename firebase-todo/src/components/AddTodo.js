// FILE: src/components/AddTodo.js
import React from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


export default function AddTodo(){
const [text, setText] = React.useState('');


async function add(e){
e.preventDefault();
if(!auth.currentUser) return alert('Please sign in');
if(!text.trim()) return;
await addDoc(collection(db, 'todos'), {
text: text.trim(),
uid: auth.currentUser.uid,
completed: false,
createdAt: serverTimestamp()
});
setText('');
}


return (
<form onSubmit={add} className="add-todo">
<input value={text} onChange={e=>setText(e.target.value)} placeholder="Add todo..." />
<button type="submit">Add</button>
</form>
);
}