'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const emailFromUrl = searchParams.get('email') ?? '';

  const [email, setEmail] = useState(emailFromUrl);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  // Auto-submit if email is pre-filled from the link
  useEffect(() => {
    if (emailFromUrl) {
      handleUnsubscribe(emailFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUnsubscribe(targetEmail: string) {
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message ?? 'Erfolgreich abgemeldet.');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Ein Fehler ist aufgetreten.');
      }
    } catch {
      setStatus('error');
      setMessage('Ein unerwarteter Fehler ist aufgetreten.');
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) handleUnsubscribe(email);
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#111111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          background: '#1A1A1A',
          borderRadius: '24px',
          border: '1px solid #2a2a2a',
          padding: '48px 40px',
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <img
          src="/logo-iod.png"
          alt="IOD"
          style={{ height: '32px', marginBottom: '32px', display: 'inline-block' }}
        />

        {status === 'success' ? (
          <>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '12px',
                letterSpacing: '-0.5px',
              }}
            >
              Schade, dass du gehst.
            </h1>
            <p style={{ color: '#777777', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
              {message} Du wirst keine weiteren E-Mails von IOD erhalten.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                background: '#CCFF00',
                color: '#111111',
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '14px 32px',
                borderRadius: '4px',
              }}
            >
              Zurück zur Webseite
            </Link>
          </>
        ) : (
          <>
            <h1
              style={{
                fontFamily: "'Space Grotesk', Arial, sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '12px',
                letterSpacing: '-0.5px',
              }}
            >
              Abmelden
            </h1>
            <p style={{ color: '#777777', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
              {emailFromUrl
                ? 'Klicke auf den Button, um dich aus unserem Launch-Newsletter abzumelden.'
                : 'Gib deine E-Mail-Adresse ein, um dich aus unserem Launch-Newsletter abzumelden.'}
            </p>

            <form onSubmit={onSubmit}>
              {!emailFromUrl && (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.com"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#111111',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontFamily: "'Plus Jakarta Sans', Arial, sans-serif",
                    marginBottom: '16px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              )}

              {status === 'error' && (
                <p style={{ color: '#FF00FF', fontSize: '13px', marginBottom: '16px' }}>{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: status === 'loading' ? '#555555' : '#CCFF00',
                  color: '#111111',
                  fontFamily: "'Space Grotesk', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'loading' ? 'Wird abgemeldet...' : 'Jetzt abmelden'}
              </button>
            </form>

            <p style={{ color: '#444444', fontSize: '12px', marginTop: '24px' }}>
              Du kannst dich jederzeit wieder{' '}
              <Link href="/#newsletter" style={{ color: '#666666' }}>
                anmelden
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </main>
  );
}
