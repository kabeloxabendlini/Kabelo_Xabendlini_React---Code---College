// FILE: src/components/TodoPage.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection, query, orderBy, onSnapshot,
  deleteDoc, doc, updateDoc,
} from "firebase/firestore";
import AddTodo from "./AddTodo";

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | active | done
  const userId = auth.currentUser?.uid;
  const userEmail = auth.currentUser?.email;

  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, "users", userId, "todos"),
      orderBy("createdAt")
    );
    return onSnapshot(q, (snap) => {
      setTodos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, [userId]);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, "users", userId, "todos", id));
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (todo) => {
    await updateDoc(doc(db, "users", userId, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const handleClearDone = async () => {
    const done = todos.filter((t) => t.completed);
    await Promise.all(done.map((t) => deleteDoc(doc(db, "users", userId, "todos", t.id))));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done")   return t.completed;
    return true;
  });

  const doneCount   = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const progress    = todos.length ? Math.round((doneCount / todos.length) * 100) : 0;

  const handle = userEmail?.split("@")[0] ?? "Your";

  return (
    <>
      <style>{css}</style>
      <div className="tp-shell">
        <div className="tp-card">

          {/* Header */}
          <div className="tp-header">
            <div>
              <p className="tp-eyebrow">{handle}</p>
              <h2 className="tp-title">To‑do list</h2>
            </div>
            <div className="tp-stats">
              <span className="tp-stat">
                <span className="tp-stat-num">{activeCount}</span>
                <span className="tp-stat-label">left</span>
              </span>
              <span className="tp-stat-div" />
              <span className="tp-stat">
                <span className="tp-stat-num">{doneCount}</span>
                <span className="tp-stat-label">done</span>
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {todos.length > 0 && (
            <div className="tp-progress-wrap">
              <div className="tp-progress-bar">
                <div className="tp-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="tp-progress-pct">{progress}%</span>
            </div>
          )}

          {/* Add todo */}
          <AddTodo />

          {/* Filter tabs */}
          {todos.length > 0 && (
            <div className="tp-filters">
              {["all", "active", "done"].map((f) => (
                <button
                  key={f}
                  className={`tp-filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
              {doneCount > 0 && (
                <button className="tp-clear-btn" onClick={handleClearDone}>
                  Clear done
                </button>
              )}
            </div>
          )}

          {/* List */}
          {filtered.length === 0 ? (
            <div className="tp-empty">
              {filter === "done" ? (
                <>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="13" stroke="#2a2a34" strokeWidth="1.5"/>
                    <path d="M10 16l4 4 8-8" stroke="#3a3a44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Nothing completed yet.</p>
                </>
              ) : filter === "active" ? (
                <>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="13" stroke="#2a2a34" strokeWidth="1.5"/>
                    <path d="M10 16l4 4 8-8" stroke="#e8ff47" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>All caught up!</p>
                </>
              ) : (
                <>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="7" y="10" width="18" height="2" rx="1" fill="#2a2a34"/>
                    <rect x="7" y="15" width="18" height="2" rx="1" fill="#2a2a34"/>
                    <rect x="7" y="20" width="12" height="2" rx="1" fill="#2a2a34"/>
                  </svg>
                  <p>No todos yet. Add one above.</p>
                </>
              )}
            </div>
          ) : (
            <ul className="tp-list">
              {filtered.map((t, i) => (
                <li
                  key={t.id}
                  className={`tp-item ${t.completed ? "done" : ""} ${deletingId === t.id ? "deleting" : ""}`}
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  {/* Checkbox */}
                  <button
                    className={`tp-check ${t.completed ? "checked" : ""}`}
                    onClick={() => handleToggle(t)}
                    aria-label={t.completed ? "Mark incomplete" : "Mark complete"}
                  >
                    {t.completed && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#0a0a0a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>

                  {/* Text */}
                  <span className="tp-item-text">{t.text}</span>

                  {/* Delete */}
                  <button
                    className="tp-delete-btn"
                    onClick={() => handleDelete(t.id)}
                    disabled={deletingId === t.id}
                    aria-label="Delete todo"
                  >
                    {deletingId === t.id ? (
                      <svg className="spin" width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.8"
                          strokeDasharray="20" strokeDashoffset="7"/>
                      </svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 3h9M5 3V2h3v1M4 3l.5 7.5h4L9 3"
                          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&display=swap');

  .tp-shell {
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: #0c0c0d;
    padding: 48px 24px;
    font-family: 'Sora', sans-serif;
  }

  .tp-card {
    width: 100%;
    max-width: 500px;
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
  .tp-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .tp-eyebrow {
    margin: 0 0 2px;
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #e8ff47;
  }

  .tp-title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #f0f0f2;
    letter-spacing: -0.03em;
  }

  .tp-stats {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #18181c;
    border: 1px solid #222226;
    border-radius: 12px;
    padding: 8px 14px;
  }

  .tp-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tp-stat-num {
    font-size: 1rem;
    font-weight: 600;
    color: #e0e0ea;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .tp-stat-label {
    font-size: 0.65rem;
    color: #555560;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-top: 2px;
  }

  .tp-stat-div {
    width: 1px;
    height: 24px;
    background: #2a2a30;
  }

  /* Progress */
  .tp-progress-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .tp-progress-bar {
    flex: 1;
    height: 3px;
    background: #1e1e24;
    border-radius: 3px;
    overflow: hidden;
  }

  .tp-progress-fill {
    height: 100%;
    background: #e8ff47;
    border-radius: 3px;
    transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
  }

  .tp-progress-pct {
    font-size: 0.72rem;
    font-weight: 600;
    color: #555560;
    font-variant-numeric: tabular-nums;
    min-width: 28px;
    text-align: right;
  }

  /* Filters */
  .tp-filters {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 14px;
  }

  .tp-filter-btn {
    padding: 5px 12px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: transparent;
    color: #555560;
    font-family: 'Sora', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: -0.01em;
  }

  .tp-filter-btn:hover { color: #909098; background: #18181c; }

  .tp-filter-btn.active {
    background: #1c1c22;
    border-color: #2a2a30;
    color: #e8ff47;
  }

  .tp-clear-btn {
    margin-left: auto;
    padding: 5px 12px;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: #444450;
    font-family: 'Sora', sans-serif;
    font-size: 0.75rem;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
  }

  .tp-clear-btn:hover {
    color: #ff7070;
    background: rgba(255,90,90,0.07);
  }

  /* Empty */
  .tp-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 36px 0;
    color: #3a3a44;
    font-size: 0.82rem;
  }

  .tp-empty p { margin: 0; }

  /* List */
  .tp-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tp-item {
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
    from { opacity: 0; transform: translateX(-6px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .tp-item:hover {
    background: #1c1c22;
    border-color: #2a2a30;
  }

  .tp-item.done .tp-item-text {
    text-decoration: line-through;
    color: #3a3a44;
  }

  .tp-item.deleting {
    opacity: 0.35;
    pointer-events: none;
  }

  /* Checkbox */
  .tp-check {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1.5px solid #2a2a34;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s, background 0.2s;
  }

  .tp-check:hover { border-color: #e8ff47; }

  .tp-check.checked {
    background: #e8ff47;
    border-color: #e8ff47;
  }

  /* Item text */
  .tp-item-text {
    flex: 1;
    font-size: 0.88rem;
    color: #c0c0cc;
    letter-spacing: -0.01em;
    transition: color 0.2s;
    word-break: break-word;
  }

  /* Delete */
  .tp-delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 7px;
    background: transparent;
    color: #2e2e36;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
    opacity: 0;
  }

  .tp-item:hover .tp-delete-btn { opacity: 1; color: #3a3a44; }

  .tp-delete-btn:hover:not(:disabled) {
    background: rgba(255,90,90,0.1);
    color: #ff7070;
  }

  .tp-delete-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .spin { animation: spin 0.8s linear infinite; }

  @keyframes spin { to { transform: rotate(360deg); } }
`;