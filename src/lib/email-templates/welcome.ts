/**
 * IOD Welcome Email Template
 * Matches the "Kinetic Tactility" design system:
 * - Electric Lime (#a3fe00) accent
 * - Dark organic background (#1a1c18)
 * - Space Grotesk + Plus Jakarta Sans typography
 * - Soft rounded corners, no harsh borders
 */
export function buildWelcomeEmail(email: string): string {
  return /* html */ `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Willkommen bei IOD – Inside Out Design</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: #1a1c18;
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      color: #e2e8d8;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .email-wrapper {
      width: 100%;
      background-color: #1a1c18;
      padding: 40px 16px;
    }

    .email-card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #21241e;
      border-radius: 32px;
      overflow: hidden;
    }

    /* ── Hero ─────────────────────────────────────────── */
    .hero {
      background: linear-gradient(135deg, #1a2400 0%, #1e2b00 40%, #243200 100%);
      padding: 56px 48px 48px;
      text-align: left;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: 'IOD';
      position: absolute;
      top: -10px;
      right: -20px;
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 160px;
      font-weight: 700;
      color: #a3fe00;
      opacity: 0.05;
      letter-spacing: -6px;
      line-height: 1;
      pointer-events: none;
    }

    .brand-pill {
      display: inline-block;
      background-color: #a3fe00;
      color: #0f1800;
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 9999px;
      margin-bottom: 28px;
    }

    .hero-headline {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 38px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.1;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }

    .hero-headline .accent {
      color: #a3fe00;
    }

    .hero-subline {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 16px;
      color: #a3b89a;
      line-height: 1.6;
      max-width: 420px;
    }

    /* ── Content Body ─────────────────────────────────── */
    .content {
      padding: 48px 48px 40px;
    }

    .greeting {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #e8f5d0;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }

    .body-text {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 15px;
      color: #9aab8e;
      line-height: 1.75;
      margin-bottom: 32px;
    }

    /* ── Promise Cards ────────────────────────────────── */
    .promise-grid {
      display: table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-bottom: 40px;
    }

    .promise-item {
      display: table-row;
    }

    .promise-icon-cell {
      display: table-cell;
      width: 52px;
      vertical-align: top;
      padding-bottom: 24px;
    }

    .promise-icon {
      width: 44px;
      height: 44px;
      background-color: #0f1800;
      border-radius: 14px;
      display: inline-block;
      text-align: center;
      line-height: 44px;
      font-size: 20px;
    }

    .promise-text-cell {
      display: table-cell;
      vertical-align: top;
      padding-left: 16px;
      padding-bottom: 24px;
    }

    .promise-title {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #e8f5d0;
      letter-spacing: 0.3px;
      margin-bottom: 4px;
    }

    .promise-desc {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 13px;
      color: #7a8a6e;
      line-height: 1.6;
    }

    /* ── CTA Block ────────────────────────────────────── */
    .cta-block {
      background: linear-gradient(135deg, #0f1800 0%, #162100 100%);
      border-radius: 24px;
      padding: 36px 40px;
      text-align: center;
      margin-bottom: 40px;
    }

    .cta-label {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #a3fe00;
      margin-bottom: 10px;
    }

    .cta-headline {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.8px;
      margin-bottom: 8px;
    }

    .cta-sub {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 14px;
      color: #7a8a6e;
      margin-bottom: 28px;
      line-height: 1.6;
    }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #a3fe00 0%, #8cd900 100%);
      color: #0f1800;
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 9999px;
    }

    /* ── Signature ────────────────────────────────────── */
    .signature {
      border-top: 1px solid #2a2f24;
      padding-top: 32px;
      margin-top: 8px;
    }

    .signature-text {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 14px;
      color: #7a8a6e;
      line-height: 1.7;
    }

    .signature-name {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #c8dab8;
      margin-top: 12px;
    }

    .signature-role {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 12px;
      color: #5a6a50;
      margin-top: 2px;
    }

    /* ── Footer ───────────────────────────────────────── */
    .email-footer {
      background-color: #161810;
      border-radius: 0 0 32px 32px;
      padding: 28px 48px;
      text-align: center;
    }

    .footer-brand {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #a3fe00;
      letter-spacing: -0.5px;
      margin-bottom: 6px;
    }

    .footer-tagline {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 11px;
      color: #3a4830;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }

    .footer-legal {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 11px;
      color: #3a4830;
      line-height: 1.7;
    }

    .footer-legal a {
      color: #5a6a50;
      text-decoration: none;
    }

    /* ── Responsive ───────────────────────────────────── */
    @media only screen and (max-width: 600px) {
      .hero { padding: 40px 28px 36px; }
      .hero-headline { font-size: 28px; }
      .content { padding: 36px 28px 32px; }
      .cta-block { padding: 28px 24px; }
      .email-footer { padding: 24px 28px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-card">

      <!-- ── HERO ── -->
      <div class="hero">
        <div class="brand-pill">Inside Out Design</div>
        <h1 class="hero-headline">
          Du bist dabei.<br />
          <span class="accent">Wir auch.</span>
        </h1>
        <p class="hero-subline">
          Danke, dass du dich für den IOD-Launch angemeldet hast.
          Wir bauen gerade etwas, das die Pumptrack-Welt auf den Kopf stellt –
          und du bist als Erstes dabei.
        </p>
      </div>

      <!-- ── BODY ── -->
      <div class="content">
        <p class="greeting">Hey, wir freuen uns mega! 🎉</p>
        <p class="body-text">
          Deine E-Mail-Adresse (<strong style="color:#c8dab8;">${email}</strong>) ist jetzt in
          unserem Launch-Radar. Sobald der Shop live geht, bist du die Erste / der Erste, der
          es erfährt – mit exklusivem Early-Bird-Zugang und allem, was dazugehört.
        </p>

        <!-- Promise Grid -->
        <table class="promise-grid" role="presentation" cellspacing="0" cellpadding="0">
          <tr class="promise-item">
            <td class="promise-icon-cell">
              <span class="promise-icon">⚡</span>
            </td>
            <td class="promise-text-cell">
              <div class="promise-title">Early-Bird-Zugang</div>
              <div class="promise-desc">Du erhältst deinen persönlichen Link, bevor der Shop für alle öffnet.</div>
            </td>
          </tr>
          <tr class="promise-item">
            <td class="promise-icon-cell">
              <span class="promise-icon">🛡️</span>
            </td>
            <td class="promise-text-cell">
              <div class="promise-title">Kein Spam – versprochen</div>
              <div class="promise-desc">Wir schreiben dir nur, wenn es wirklich etwas zu sagen gibt. Punkt.</div>
            </td>
          </tr>
          <tr class="promise-item">
            <td class="promise-icon-cell">
              <span class="promise-icon">🌿</span>
            </td>
            <td class="promise-text-cell">
              <div class="promise-title">Nachhaltig &amp; made to last</div>
              <div class="promise-desc">Unsere Pads sind aus recyceltem Material, designed für echte Tracks und echte Rider.</div>
            </td>
          </tr>
        </table>

        <!-- CTA Block -->
        <div class="cta-block">
          <div class="cta-label">Launch bald</div>
          <div class="cta-headline">Bereit für den Flow?</div>
          <div class="cta-sub">
            Schau schon mal rein – die Produkte warten auf deinen ersten Blick.
          </div>
          <a class="cta-button" href="https://iod-pads.vercel.app" target="_blank" rel="noopener noreferrer">
            Zur Webseite →
          </a>
        </div>

        <!-- Signature -->
        <div class="signature">
          <p class="signature-text">
            Mit Energie &amp; Leidenschaft aus dem Sattel heraus,
          </p>
          <p class="signature-name">Das IOD-Team</p>
          <p class="signature-role">Inside Out Design · Pumptrack Pads, DACH</p>
        </div>
      </div>

      <!-- ── FOOTER ── -->
      <div class="email-footer">
        <div class="footer-brand">IOD</div>
        <div class="footer-tagline">Inside Out Design · Pumptrack Pads</div>
        <p class="footer-legal">
          Du erhältst diese E-Mail, weil du dich für unsere Launch-Benachrichtigung angemeldet hast.<br />
          Keine weiteren E-Mails erwünscht?
          <a href="https://iod-pads.vercel.app/unsubscribe">Hier abmelden.</a><br /><br />
          © ${new Date().getFullYear()} Inside Out Design GmbH · DACH Region
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`.trim();
}
