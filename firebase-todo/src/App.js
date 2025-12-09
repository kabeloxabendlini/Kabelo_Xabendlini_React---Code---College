// FILE: src/App.js
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Auth from './components/Auth';
import TodoList from './components/TodoList';
import Profile from './components/Profile';
import Projects from './components/Projects';
import { auth } from './firebase';
import './App.css';


export default function App(){
const navigate = useNavigate();


React.useEffect(()=>{
const unsub = auth.onAuthStateChanged(user => {
if(!user) navigate('/auth');
});
return ()=>unsub();
}, [navigate]);


return (
<div className="app">
<nav className="nav">
<Link to="/">Todos</Link>
<Link to="/projects">Projects</Link>
<Link to="/profile">Profile</Link>
</nav>


<main>
<Routes>
<Route path="/auth" element={<Auth/>} />
<Route path="/" element={<TodoList/>} />
<Route path="/projects" element={<Projects/>} />
<Route path="/profile" element={<Profile/>} />
<Route path="*" element={<Auth/>} />
</Routes>
</main>
</div>
);
}