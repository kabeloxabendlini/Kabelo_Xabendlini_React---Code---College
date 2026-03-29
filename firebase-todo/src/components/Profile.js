// FILE: src/components/Profile.js
import React, { useState } from 'react';
import { auth } from '../firebase';

export default function Profile() {
  const user = auth.currentUser;
  const [copied, setCopied] = useState(null);

  if (!user) {
    return (
      <>
        <style>{css}</style>
        <div className="profile-shell">
          <div className="profile-signed-out">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#2a2a30" strokeWidth="1.5"/>
              <circle cx="20" cy="16" r="6" stroke="#3a3a44" strokeWidth="1.5"/>
              <path d="M8 34c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="#3a3a44" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>No one's home. Please sign in.</p>
          </div>
        </div>
      </>
    );
  }

  const initials = user.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user.email?.[0]?.toUpperCase() ?? '?';

  const joinDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  const copyToClipboard = async (text, field) => {
    await navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const fields = [
    { key: 'email',    label: 'Email',    value: user.email,        copyable: true },
    { key: 'uid',      label: 'User ID',  value: user.uid,          copyable: true, mono: true },
    { key: 'name',     label: 'Name',     value: user.displayName ?? '—', copyable: false },
    { key: 'verified', label: 'Verified', value: user.emailVerified ? 'Yes' : 'No', copyable: false, badge: true },
  ].filter(f => f.value);

  return (
    <>
      <style>{css}</style>
      <div className="profile-shell">
        <div className="profile-card">

          {/* Avatar */}
          <div className="profile-avatar-wrap">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-initials">{initials}</div>
            )}
            <div className={`profile-avatar-badge ${user.emailVerified ? 'verified' : 'unverified'}`}>
              {user.emailVerified
                ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 3l4 4M7 3l-4 4" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"/></svg>
              }
            </div>
          </div>

          {/* Name + joined */}
          <div className="profile-identity">
            <h2 className="profile-name">{user.displayName ?? 'Anonymous'}</h2>
            {joinDate && <p className="profile-joined">Member since {joinDate}</p>}
          </div>

          {/* Fields */}
          <div className="profile-fields">
            {fields.map(({ key, label, value, copyable, mono, badge }) => (
              <div key={key} className="profile-field">
                <span className="profile-field-label">{label}</span>
                <div className="profile-field-right">
                  {badge ? (
                    <span className={`profile-pill ${value === 'Yes' ? 'green' : 'red'}`}>{value}</span>
                  ) : (
                    <span className={`profile-field-value ${mono ? 'mono' : ''}`}>{value}</span>
                  )}
                  {copyable && (
                    <button
                      className={`profile-copy-btn ${copied === key ? 'done' : ''}`}
                      onClick={() => copyToClipboard(value, key)}
                      aria-label={`Copy ${label}`}
                    >
                      {copied === key ? (
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M9 4V2.5A1.5 1.5 0 0 0 7.5 1h-5A1.5 1.5 0 0 0 1 2.5v5A1.5 1.5 0 0 0 2.5 9H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sign out */}
          <button className="profile-signout-btn" onClick={() => auth.signOut()}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M6 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3M10 10l3-2.5L10 5M13 7.5H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </button>

        </div>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Mono:wght@400&display=swap');

  .profile-shell {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0c0c0d;
    padding: 24px;
    font-family: 'Sora', sans-serif;
  }

  .profile-signed-out {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    color: #3a3a44;
    font-size: 0.88rem;
  }

  .profile-card {
    width: 100%;
    max-width: 380px;
    background: #111113;
    border: 1px solid #222226;
    border-radius: 20px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6);
    animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Avatar */
  .profile-avatar-wrap {
    position: relative;
    margin-bottom: 16px;
  }

  .profile-avatar-img,
  .profile-avatar-initials {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 2px solid #222226;
  }

  .profile-avatar-img {
    object-fit: cover;
    display: block;
  }

  .profile-avatar-initials {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1c1c22;
    color: #e8ff47;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .profile-avatar-badge {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #111113;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-avatar-badge.verified   { background: #e8ff47; }
  .profile-avatar-badge.unverified { background: #ff5a5a; }

  /* Identity */
  .profile-identity {
    text-align: center;
    margin-bottom: 24px;
  }

  .profile-name {
    margin: 0 0 4px;
    font-size: 1.2rem;
    font-weight: 600;
    color: #f0f0f2;
    letter-spacing: -0.03em;
  }

  .profile-joined {
    margin: 0;
    font-size: 0.78rem;
    color: #555560;
  }

  /* Fields */
  .profile-fields {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-bottom: 20px;
  }

  .profile-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 11px 14px;
    border-radius: 10px;
    background: #18181c;
    transition: background 0.15s;
  }

  .profile-field:hover {
    background: #1c1c22;
  }

  .profile-field-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #555560;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    flex-shrink: 0;
  }

  .profile-field-right {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .profile-field-value {
    font-size: 0.85rem;
    color: #c0c0cc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .profile-field-value.mono {
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    color: #888898;
    max-width: 140px;
  }

  .profile-pill {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    padding: 3px 8px;
    border-radius: 20px;
    text-transform: uppercase;
  }

  .profile-pill.green { background: rgba(232,255,71,0.12); color: #e8ff47; }
  .profile-pill.red   { background: rgba(255,90,90,0.12);  color: #ff7070; }

  .profile-copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #444450;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }

  .profile-copy-btn:hover { background: #252530; color: #909098; }
  .profile-copy-btn.done  { color: #e8ff47; }

  /* Sign out */
  .profile-signout-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: 1px solid #2a2a30;
    border-radius: 10px;
    background: transparent;
    color: #666670;
    font-family: 'Sora', sans-serif;
    font-size: 0.84rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    letter-spacing: -0.01em;
  }

  .profile-signout-btn:hover {
    border-color: #ff5a5a44;
    color: #ff7070;
    background: rgba(255,90,90,0.06);
  }
`;