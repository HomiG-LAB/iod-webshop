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
      background-color: #1A1A1A;
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      color: #e0e0e0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    .email-wrapper {
      width: 100%;
      background-color: #1A1A1A;
      padding: 40px 16px;
    }

    .email-card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #111111;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #2a2a2a;
    }

    /* ── Hero ─────────────────────────────────────────── */
    .hero {
      background-color: #1A1A1A;
      padding: 56px 48px 40px;
      text-align: left;
      border-bottom: 1px solid #2a2a2a;
    }

    .brand-logo {
      display: block;
      height: 32px;
      margin-bottom: 32px;
    }

    .hero-headline {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 42px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.1;
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }

    .hero-headline .accent {
      color: #CCFF00;
    }

    .hero-subline {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 16px;
      color: #999999;
      line-height: 1.6;
      max-width: 420px;
    }

    /* ── Content Body ─────────────────────────────────── */
    .content {
      padding: 40px 48px 40px;
    }

    .greeting {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }

    .body-text {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 15px;
      color: #999999;
      line-height: 1.75;
      margin-bottom: 48px;
    }

    /* ── Promise Layout (3 Columns) ───────────────────── */
    .promise-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 48px;
    }

    .promise-column {
      width: 33.333%;
      padding: 0 12px;
      text-align: center;
      vertical-align: top;
    }

    .promise-icon-wrap {
      margin-bottom: 16px;
    }

    .promise-title {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .promise-desc {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 13px;
      color: #777777;
      line-height: 1.5;
    }

    /* ── CTA Block ────────────────────────────────────── */
    .cta-block {
      background-color: #1A1A1A;
      border-radius: 16px;
      padding: 40px;
      text-align: center;
      margin-bottom: 48px;
      border: 1px solid #333333;
    }

    .cta-headline {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.5px;
      margin-bottom: 12px;
    }

    .cta-sub {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 14px;
      color: #999999;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .cta-button {
      display: inline-block;
      background-color: #CCFF00;
      color: #1A1A1A;
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      padding: 16px 40px;
      border-radius: 4px;
    }

    /* ── Signature ────────────────────────────────────── */
    .signature {
      border-top: 1px solid #222222;
      padding-top: 32px;
    }

    .signature-text {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 14px;
      color: #777777;
      line-height: 1.7;
    }

    .signature-name {
      font-family: 'Space Grotesk', Arial, sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin-top: 12px;
    }

    .signature-role {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 12px;
      color: #555555;
      margin-top: 2px;
    }

    /* ── Footer ───────────────────────────────────────── */
    .email-footer {
      background-color: #111111;
      padding: 32px 48px;
      text-align: center;
      border-top: 1px solid #222222;
    }

    .footer-logo {
      display: inline-block;
      height: 20px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .footer-legal {
      font-family: 'Plus Jakarta Sans', Arial, sans-serif;
      font-size: 11px;
      color: #555555;
      line-height: 1.7;
    }

    .footer-legal a {
      color: #888888;
      text-decoration: none;
    }

    /* ── Responsive ───────────────────────────────────── */
    @media only screen and (max-width: 600px) {
      .hero { padding: 40px 24px 32px; }
      .hero-headline { font-size: 34px; }
      .content { padding: 32px 24px; }
      .cta-block { padding: 32px 20px; }
      .email-footer { padding: 24px; }
      
      .promise-column {
        display: block !important;
        width: 100% !important;
        margin-bottom: 32px !important;
        padding: 0 !important;
      }
      .promise-column:last-child {
        margin-bottom: 0 !important;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-card">

      <!-- ── HERO ── -->
      <div class="hero">
        <img src="https://www.iod-shop.com/logo-iod.png" alt="IOD Logo" class="brand-logo" />
        <h1 class="hero-headline">
          Du bist dabei.<br />
          <span class="accent">WIR AUCH.</span>
        </h1>
        <p class="hero-subline">
          Danke, dass du dich für den IOD-Launch angemeldet hast.
          Wir bauen gerade etwas, das die Pumptrack-Welt auf den Kopf stellt –
          und du bist als Erstes dabei.
        </p>
      </div>

      <!-- ── BODY ── -->
      <div class="content">
        <p class="greeting">Hey, wir freuen uns mega!</p>
        <p class="body-text">
          Deine E-Mail-Adresse (<strong style="color:#ffffff;">${email}</strong>) ist jetzt in
          unserem Launch-Radar. Sobald der Shop live geht, bist du die Erste / der Erste, der
          es erfährt – mit exklusivem Early-Bird-Zugang und allem, was dazugehört.
        </p>

        <!-- Promise Columns -->
        <table class="promise-table" role="presentation" cellspacing="0" cellpadding="0">
          <tr>
            <td class="promise-column">
              <div class="promise-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div class="promise-title">Early-Bird</div>
              <div class="promise-desc">Persönlicher Link, bevor der Shop für alle öffnet.</div>
            </td>
            <td class="promise-column">
              <div class="promise-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="promise-title">Kein Spam</div>
              <div class="promise-desc">Wir schreiben dir nur, wenn es wirklich was zu sagen gibt.</div>
            </td>
            <td class="promise-column">
              <div class="promise-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              <div class="promise-title">Nachhaltig</div>
              <div class="promise-desc">Recyceltes Material, für echte Rider designed.</div>
            </td>
          </tr>
        </table>

        <!-- CTA Block -->
        <div class="cta-block">
          <div class="cta-headline">Bereit für den Flow?</div>
          <div class="cta-sub">
            Schau schon mal rein – die Produkte warten auf deinen ersten Blick.
          </div>
          <a class="cta-button" href="https://www.iod-shop.com" target="_blank" rel="noopener noreferrer">
            ZUR WEBSEITE
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
        <img src="https://www.iod-shop.com/logo-iod.png" alt="IOD Logo" class="footer-logo" />
        <p class="footer-legal">
          Du erhältst diese E-Mail, weil du dich für unsere Launch-Benachrichtigung angemeldet hast.<br />
          Keine weiteren E-Mails erwünscht?
          <a href="https://www.iod-shop.com/unsubscribe">Hier abmelden.</a><br /><br />
          © ${new Date().getFullYear()} Inside Out Design GmbH · DACH Region
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`.trim();
}
