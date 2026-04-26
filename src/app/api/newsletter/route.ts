import { NextResponse } from 'next/server';
import { buildWelcomeEmail } from '@/lib/email-templates/welcome';

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
      console.error('BREVO_API_KEY is not defined in environment variables');
      return NextResponse.json(
        { error: 'Server Konfigurationsfehler' },
        { status: 500 }
      );
    }

    // ── 1. Add contact to Brevo (updateEnabled: false = fail if exists) ────
    const contactResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        updateEnabled: false,
        attributes: {
          SOURCE: 'IOD Pre-Launch Signup',
        },
      }),
    });

    let contactData: { code?: string; message?: string } | null = null;

    // 204 = contact updated (shouldn't happen with updateEnabled:false, but guard anyway)
    if (contactResponse.status === 204) {
      return NextResponse.json(
        { message: 'Du bist bereits in der Liste! Wir melden uns beim Launch. 🤙', alreadySubscribed: true },
        { status: 200 }
      );
    }

    // Try to parse the JSON body for all other responses
    try {
      contactData = await contactResponse.json();
    } catch {
      // ignore empty body
    }

    // Brevo returns 400 + code "duplicate_parameter" if email already exists
    if (!contactResponse.ok) {
      if (contactData?.code === 'duplicate_parameter') {
        return NextResponse.json(
          { message: 'Du bist bereits in der Liste! Wir melden uns beim Launch. 🤙', alreadySubscribed: true },
          { status: 200 }
        );
      }
      console.error('Brevo Contact API Error:', contactData);
      return NextResponse.json(
        { error: contactData?.message || 'Fehler beim Eintragen in den Newsletter.' },
        { status: contactResponse.status }
      );
    }

    // ── 2. Send welcome email only for NEW contacts ────────────────────────
    const htmlContent = buildWelcomeEmail(email);

    const emailResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'IOD – Inside Out Design',
          email: 'no-reply@iod-shop.com',
        },
        to: [{ email }],
        subject: '🚀 Du bist dabei – IOD Launch-Benachrichtigung bestätigt!',
        htmlContent,
        tags: ['welcome', 'pre-launch'],
      }),
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.json();
      console.error('Brevo Welcome Email Error:', emailError);
      // Don't block user – contact was saved successfully
    }

    return NextResponse.json(
      { message: 'Erfolgreich eingetragen! Schau in dein Postfach.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten.' },
      { status: 500 }
    );
  }
}
