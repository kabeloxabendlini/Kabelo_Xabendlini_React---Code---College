// FILE: src/components/TodoList.js
import React from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import AddTodo from './AddTodo';


export default function TodoList(){
const [todos, setTodos] = React.useState([]);
const user = auth.currentUser;


React.useEffect(()=>{
if(!user) return;
const q = query(collection(db, 'todos'), where('uid','==', user.uid), orderBy('createdAt','desc'));
const unsub = onSnapshot(q, snap => {
const arr = snap.docs.map(d=>({ id: d.id, ...d.data() }));
setTodos(arr);
});
return ()=>unsub();
}, [user]);


async function toggleComplete(todo){
await updateDoc(doc(db, 'todos', todo.id), { completed: !todo.completed });
}


async function remove(todo){
await deleteDoc(doc(db, 'todos', todo.id));
}


return (
<div className="todo-page">
<h2>Your Todos</h2>
<AddTodo />
<ul className="todo-list">
{todos.map(t=> (
<li key={t.id} className={t.completed ? 'done' : ''}>
<input type="checkbox" checked={!!t.completed} onChange={()=>toggleComplete(t)} />
<span>{t.text}</span>
<button onClick={()=>remove(t)}>Delete</button>
</li>
))}
</ul>
</div>
);
}