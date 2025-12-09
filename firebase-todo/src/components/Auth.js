// FILE: src/components/Auth.js
import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Auth(){
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [error, setError] = React.useState(null);
const navigate = useNavigate();


async function handleSignin(e){
e.preventDefault();
setError(null);
try{ await signInWithEmailAndPassword(auth, email, password); navigate('/'); }
catch(err){ setError(err.message); }
}


async function handleSignup(e){
e.preventDefault();
setError(null);
try{ await createUserWithEmailAndPassword(auth, email, password); navigate('/'); }
catch(err){ setError(err.message); }
}


async function handleGoogle(){
try{ await signInWithPopup(auth, googleProvider); navigate('/'); }
catch(err){ setError(err.message); }
}


async function handleSignout(){
await signOut(auth);
navigate('/auth');
}


return (
<div className="auth-card">
<h2>Sign in / Sign up</h2>
<form onSubmit={handleSignin}>
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
<div className="btn-row">
<button type="submit">Sign In</button>
<button type="button" onClick={handleSignup}>Sign Up</button>
</div>
</form>
<button onClick={handleGoogle}>Sign in with Google</button>
{auth.currentUser && <button onClick={handleSignout}>Sign Out</button>}
{error && <p className="error">{error}</p>}
</div>
);
}