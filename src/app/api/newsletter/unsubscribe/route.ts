import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Gültige E-Mail Adresse wird benötigt.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Server Konfigurationsfehler' }, { status: 500 });
    }

    // Unsubscribe contact via Brevo API (set email blacklisted)
    const response = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        emailBlacklisted: true,
      }),
    });

    if (!response.ok && response.status !== 204) {
      let errorData = null;
      try { errorData = await response.json(); } catch { /* empty */ }
      console.error('Brevo Unsubscribe Error:', errorData);
      return NextResponse.json(
        { error: 'Abmeldung fehlgeschlagen. Bitte versuche es erneut.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Erfolgreich abgemeldet.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unsubscribe API Error:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
