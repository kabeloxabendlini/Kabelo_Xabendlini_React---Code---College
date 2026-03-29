// FILE: src/components/AddTodo.js
import React, { useState, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTodo() {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [adding, setAdding] = useState(false);
  const inputRef = useRef(null);

  const add = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Please sign in");
    if (!text.trim()) {
      inputRef.current?.focus();
      return;
    }

    setAdding(true);
    try {
      const todosRef = collection(db, "users", auth.currentUser.uid, "todos");
      await addDoc(todosRef, {
        text: text.trim(),
        completed: false,
        createdAt: serverTimestamp(),
      });
      setText("");
    } finally {
      setAdding(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <style>{css}</style>
      <form onSubmit={add} className="add-todo-form">
        <div className={`add-todo-field ${focused ? "focused" : ""}`}>
          <span className="add-todo-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="What needs to be done?"
            className="add-todo-input"
            autoComplete="off"
            maxLength={200}
          />
          {text && (
            <button
              type="button"
              className="add-todo-clear"
              onClick={() => { setText(""); inputRef.current?.focus(); }}
              aria-label="Clear"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          className={`add-todo-btn ${adding ? "loading" : ""}`}
          disabled={adding}
          aria-label="Add todo"
        >
          {adding ? (
            <svg className="spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
          <span>{adding ? "Adding…" : "Add"}</span>
        </button>
      </form>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

  .add-todo-form {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
    font-family: 'DM Sans', sans-serif;
  }

  .add-todo-field {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    background: #fff;
    border: 1.5px solid #e2e5ea;
    border-radius: 12px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .add-todo-field.focused {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  .add-todo-icon {
    color: #c0c4cc;
    display: flex;
    flex-shrink: 0;
    transition: color 0.2s;
  }

  .add-todo-field.focused .add-todo-icon {
    color: #6366f1;
  }

  .add-todo-input {
    flex: 1;
    padding: 13px 0;
    border: none;
    outline: none;
    font-size: 0.95rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    color: #1a1d23;
    background: transparent;
    letter-spacing: -0.01em;
  }

  .add-todo-input::placeholder {
    color: #a8adb8;
  }

  .add-todo-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 4px;
    border-radius: 6px;
    color: #b0b5c0;
    cursor: pointer;
    flex-shrink: 0;
    transition: color 0.15s, background 0.15s;
    animation: fadeIn 0.15s ease;
  }

  .add-todo-clear:hover {
    color: #6b7280;
    background: #f3f4f6;
  }

  .add-todo-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 20px;
    height: 48px;
    border: none;
    border-radius: 12px;
    background: #6366f1;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.28);
  }

  .add-todo-btn:hover:not(:disabled) {
    background: #4f52e0;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.38);
    transform: translateY(-1px);
  }

  .add-todo-btn:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(99, 102, 241, 0.22);
  }

  .add-todo-btn.loading {
    background: #818cf8;
    cursor: not-allowed;
  }

  .spin {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }
`;