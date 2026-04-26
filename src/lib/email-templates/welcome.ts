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
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
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
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
    
    /* Reset & Client-specific fixes */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #1A1A1A !important; }

    /* Forcing dark mode in Apple Mail */
    @media (prefers-color-scheme: dark) {
      body, table, td { background-color: #1A1A1A !important; }
      .email-card { background-color: #111111 !important; }
      .text-light { color: #ffffff !important; }
      .text-gray { color: #999999 !important; }
    }
    
    /* Responsive */
    @media screen and (max-width: 600px) {
      .responsive-table { width: 100% !important; }
      .mobile-pad { padding: 32px 20px !important; }
      .stack-column { display: block !important; width: 100% !important; margin-bottom: 32px !important; }
      .h1-text { font-size: 34px !important; line-height: 1.2 !important; }
    }
  </style>
</head>
<body style="background-color: #1A1A1A; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;" bgcolor="#1A1A1A">

  <!-- Main Background Table -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#1A1A1A" style="background-color: #1A1A1A; margin: 0; padding: 40px 16px;">
    <tr>
      <td align="center" valign="top">
        
        <!-- Email Container -->
        <table class="responsive-table" width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#111111" style="background-color: #111111; max-width: 600px; border-radius: 24px; border: 1px solid #2a2a2a; overflow: hidden;">
          
          <!-- Hero Section -->
          <tr>
            <td class="mobile-pad" align="left" valign="top" style="padding: 56px 48px 40px; border-bottom: 1px solid #2a2a2a;">
              <img src="https://www.iod-shop.com/logo-iod.png" alt="IOD Logo" width="100" style="display: block; margin-bottom: 32px; max-height: 32px; width: auto;" />
              
              <h1 class="h1-text text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 42px; font-weight: 700; color: #ffffff; line-height: 1.1; letter-spacing: -1px; margin: 0 0 16px 0;">
                Du bist dabei.<br />
                <span style="color: #CCFF00;">WIR AUCH.</span>
              </h1>
              
              <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 16px; color: #999999; line-height: 1.6; margin: 0; max-width: 420px;">
                Danke, dass du dich für den IOD-Launch angemeldet hast. Wir bauen gerade etwas, das die Pumptrack-Welt auf den Kopf stellt – und du bist als Erstes dabei.
              </p>
            </td>
          </tr>

          <!-- Body Section -->
          <tr>
            <td class="mobile-pad" align="left" valign="top" style="padding: 40px 48px 40px;">
              <p class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 16px 0; letter-spacing: -0.5px;">
                Hey, wir freuen uns mega!
              </p>
              
              <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 15px; color: #999999; line-height: 1.75; margin: 0 0 48px 0;">
                Deine E-Mail-Adresse (<strong style="color: #ffffff;">${email}</strong>) ist jetzt in unserem Launch-Radar. Sobald der Shop live geht, bist du die Erste / der Erste, der es erfährt – mit exklusivem Early-Bird-Zugang und allem, was dazugehört.
              </p>

              <!-- 3-Column Promise Grid -->
              <!-- Email clients strip SVGs, so we use clean large emojis centered like icons -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                <tr>
                  <td class="stack-column" width="33%" align="center" valign="top" style="padding: 0 10px;">
                    <div style="font-size: 32px; margin-bottom: 12px; line-height: 1;">⚡️</div>
                    <div class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Early-Bird</div>
                    <div class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 13px; color: #777777; line-height: 1.5;">Persönlicher Link, bevor der Shop für alle öffnet.</div>
                  </td>
                  <td class="stack-column" width="33%" align="center" valign="top" style="padding: 0 10px;">
                    <div style="font-size: 32px; margin-bottom: 12px; line-height: 1;">🛡️</div>
                    <div class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Kein Spam</div>
                    <div class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 13px; color: #777777; line-height: 1.5;">Wir schreiben nur, wenn es was zu sagen gibt.</div>
                  </td>
                  <td class="stack-column" width="33%" align="center" valign="top" style="padding: 0 10px;">
                    <div style="font-size: 32px; margin-bottom: 12px; line-height: 1;">🌿</div>
                    <div class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 13px; font-weight: 700; color: #ffffff; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Nachhaltig</div>
                    <div class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 13px; color: #777777; line-height: 1.5;">Recyceltes Material, für echte Rider designed.</div>
                  </td>
                </tr>
              </table>

              <!-- CTA Block -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#1A1A1A" style="background-color: #1A1A1A; border-radius: 16px; border: 1px solid #333333; margin-bottom: 48px;">
                <tr>
                  <td align="center" valign="top" style="padding: 40px 20px;">
                    <h2 class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 12px 0;">
                      Bereit für den Flow?
                    </h2>
                    <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 14px; color: #999999; margin: 0 0 32px 0; line-height: 1.6;">
                      Schau schon mal rein – die Produkte warten auf deinen ersten Blick.
                    </p>
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#CCFF00" style="background-color: #CCFF00; border-radius: 4px;">
                          <a href="https://www.iod-shop.com" target="_blank" style="display: inline-block; padding: 16px 40px; font-family: 'Space Grotesk', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #1A1A1A; text-decoration: none; letter-spacing: 1px; text-transform: uppercase;">
                            ZUR WEBSEITE
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top: 1px solid #222222;">
                <tr>
                  <td align="left" valign="top" style="padding-top: 32px;">
                    <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 14px; color: #777777; line-height: 1.7; margin: 0;">
                      Mit Energie &amp; Leidenschaft aus dem Sattel heraus,
                    </p>
                    <p class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 16px; font-weight: 700; color: #ffffff; margin: 12px 0 2px 0;">
                      Das IOD-Team
                    </p>
                    <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 12px; color: #555555; margin: 0;">
                      Inside Out Design · Pumptrack Pads, DACH
                    </p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-pad" align="center" valign="top" bgcolor="#111111" style="background-color: #111111; padding: 32px 48px; border-top: 1px solid #222222;">
              <img src="https://www.iod-shop.com/logo-iod.png" alt="IOD Logo" width="60" style="display: block; margin: 0 auto 16px auto; opacity: 0.5; max-height: 20px; width: auto;" />
              <p style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 11px; color: #555555; line-height: 1.7; margin: 0;">
                Du erhältst diese E-Mail, weil du dich für unsere Launch-Benachrichtigung angemeldet hast.<br />
                Keine weiteren E-Mails erwünscht? <a href="https://www.iod-shop.com/unsubscribe" style="color: #888888; text-decoration: none;">Hier abmelden.</a><br /><br />
                © ${new Date().getFullYear()} Inside Out Design GmbH · DACH Region
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`.trim();
}
