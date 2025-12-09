// FILE: src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<React.StrictMode>
<BrowserRouter>
<Routes>
<Route path="/*" element={<App/>} />
</Routes>
</BrowserRouter>
</React.StrictMode>
);