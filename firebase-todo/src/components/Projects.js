// FILE: src/components/Projects.js
import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import {
  collection, addDoc, onSnapshot,
  serverTimestamp, deleteDoc, doc, updateDoc,
} from "firebase/firestore";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const inputRef = useRef(null);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    const ref = collection(db, "users", userId, "projects");
    return onSnapshot(ref, (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [userId]);

  const addProject = async (e) => {
    e.preventDefault();
    if (!name.trim() || !userId) return;
    setAdding(true);
    try {
      await addDoc(collection(db, "users", userId, "projects"), {
        name: name.trim(),
        createdAt: serverTimestamp(),
      });
      setName("");
      inputRef.current?.focus();
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "users", userId, "projects", id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = async (project, newName) => {
    if (!newName.trim() || newName === project.name) return;
    await updateDoc(doc(db, "users", userId, "projects", project.id), {
      name: newName.trim(),
    });
  };

  return (
    <>
      <style>{css}</style>
      <div className="proj-shell">
        <div className="proj-card">

          {/* Header */}
          <div className="proj-header">
            <div className="proj-header-left">
              <div className="proj-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="#e8ff47" strokeWidth="1.4"/>
                  <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="#e8ff47" strokeWidth="1.4"/>
                  <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="#e8ff47" strokeWidth="1.4"/>
                  <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="#e8ff47" strokeWidth="1.4" strokeDasharray="2 1.5"/>
                </svg>
              </div>
              <h2 className="proj-title">Projects</h2>
            </div>
            <span className="proj-count">{projects.length}</span>
          </div>

          {/* Add form */}
          <form onSubmit={addProject} className="proj-form">
            <div className={`proj-field ${focused ? "focused" : ""}`}>
              <input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="New project name…"
                className="proj-input"
                maxLength={80}
              />
            </div>
            <button
              type="submit"
              className={`proj-add-btn ${adding ? "loading" : ""}`}
              disabled={adding || !name.trim()}
            >
              {adding ? (
                <svg className="spin" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="2" strokeDasharray="22" strokeDashoffset="8"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 2v11M2 7.5h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
              <span>{adding ? "Creating…" : "Create"}</span>
            </button>
          </form>

          {/* List */}
          {projects.length === 0 ? (
            <div className="proj-empty">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="3" stroke="#2a2a34" strokeWidth="1.5"/>
                <rect x="20" y="2" width="14" height="14" rx="3" stroke="#2a2a34" strokeWidth="1.5"/>
                <rect x="2" y="20" width="14" height="14" rx="3" stroke="#2a2a34" strokeWidth="1.5"/>
                <rect x="20" y="20" width="14" height="14" rx="3" stroke="#2a2a34" strokeWidth="1.5" strokeDasharray="3 2"/>
              </svg>
              <p>No projects yet. Create one above.</p>
            </div>
          ) : (
            <ul className="proj-list">
              {projects.map((p, i) => (
                <li
                  key={p.id}
                  className={`proj-item ${deletingId === p.id ? "deleting" : ""}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="proj-item-dot" />
                  <EditableText
                    text={p.name}
                    onSave={(newName) => handleEdit(p, newName)}
                  />
                  <button
                    className="proj-delete-btn"
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    aria-label="Delete project"
                  >
                    {deletingId === p.id ? (
                      <svg className="spin" width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="20" strokeDashoffset="7"/>
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 3h9M5 3V2h3v1M4 3l.5 7.5h4L9 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
    </>
  );
}

function EditableText({ text, onSave }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const commit = () => {
    onSave(value);
    setEditing(false);
  };

  const cancel = () => {
    setValue(text);
    setEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") cancel();
  };

  return editing ? (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={onKeyDown}
      className="proj-edit-input"
      maxLength={80}
    />
  ) : (
    <span
      className="proj-item-name"
      onClick={() => setEditing(true)}
      title="Click to rename"
    >
      {text}
      <svg className="proj-edit-icon" width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M7.5 1.5l2 2L3 10H1V8L7.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap');

  .proj-shell {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: #0c0c0d;
    padding: 48px 24px;
    font-family: 'Sora', sans-serif;
  }

  .proj-card {
    width: 100%;
    max-width: 480px;
    background: #111113;
    border: 1px solid #222226;
    border-radius: 20px;
    padding: 28px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.55);
    animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Header */
  .proj-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  .proj-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .proj-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    background: rgba(232,255,71,0.07);
    border-radius: 9px;
    border: 1px solid rgba(232,255,71,0.12);
    flex-shrink: 0;
  }

  .proj-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #f0f0f2;
    letter-spacing: -0.03em;
  }

  .proj-count {
    font-size: 0.75rem;
    font-weight: 600;
    color: #555560;
    background: #1c1c22;
    border: 1px solid #2a2a30;
    border-radius: 20px;
    padding: 3px 10px;
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }

  /* Form */
  .proj-form {
    display: flex;
    gap: 8px;
    margin-bottom: 18px;
  }

  .proj-field {
    flex: 1;
    border: 1px solid #222226;
    border-radius: 11px;
    background: #18181c;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .proj-field.focused {
    border-color: #e8ff47;
    box-shadow: 0 0 0 3px rgba(232,255,71,0.08);
  }

  .proj-input {
    display: block;
    width: 100%;
    padding: 11px 14px;
    border: none;
    background: transparent;
    outline: none;
    font-family: 'Sora', sans-serif;
    font-size: 0.88rem;
    color: #e0e0e8;
    box-sizing: border-box;
    letter-spacing: -0.01em;
  }

  .proj-input::placeholder { color: #35353d; }

  .proj-add-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 16px;
    border: none;
    border-radius: 11px;
    background: #e8ff47;
    color: #0a0a0a;
    font-family: 'Sora', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, transform 0.1s, opacity 0.2s;
    box-shadow: 0 2px 12px rgba(232,255,71,0.2);
  }

  .proj-add-btn:hover:not(:disabled) {
    background: #f0ff6a;
    transform: translateY(-1px);
  }

  .proj-add-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* Empty */
  .proj-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 36px 0;
    color: #3a3a44;
    font-size: 0.82rem;
  }

  .proj-empty p { margin: 0; }

  /* List */
  .proj-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .proj-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 12px;
    border-radius: 11px;
    background: #18181c;
    border: 1px solid transparent;
    transition: background 0.15s, border-color 0.15s, opacity 0.3s;
    animation: itemIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes itemIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .proj-item:hover {
    background: #1c1c22;
    border-color: #2a2a30;
  }

  .proj-item.deleting {
    opacity: 0.4;
    pointer-events: none;
  }

  .proj-item-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #e8ff47;
    opacity: 0.5;
    flex-shrink: 0;
  }

  /* Editable text */
  .proj-item-name {
    flex: 1;
    font-size: 0.88rem;
    color: #c8c8d4;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: -0.01em;
    transition: color 0.15s;
  }

  .proj-item-name:hover { color: #f0f0f2; }

  .proj-edit-icon {
    color: #44444e;
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.15s;
  }

  .proj-item-name:hover .proj-edit-icon { opacity: 1; color: #888898; }

  .proj-edit-input {
    flex: 1;
    padding: 3px 8px;
    border: 1px solid #e8ff47;
    border-radius: 7px;
    background: #1c1c22;
    outline: none;
    font-family: 'Sora', sans-serif;
    font-size: 0.88rem;
    color: #f0f0f2;
    box-shadow: 0 0 0 3px rgba(232,255,71,0.08);
    min-width: 0;
    letter-spacing: -0.01em;
  }

  /* Delete */
  .proj-delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 7px;
    background: transparent;
    color: #3a3a44;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }

  .proj-delete-btn:hover:not(:disabled) {
    background: rgba(255,90,90,0.1);
    color: #ff7070;
  }

  .proj-delete-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .spin { animation: spin 0.8s linear infinite; }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;