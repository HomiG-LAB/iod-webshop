/**
 * IOD Welcome Email Template
 * Kinetic Asphalt design system:
 * - Primary:   #CCFF00 (Neon Lime)
 * - Secondary: #FF00FF (Hot Pink)
 * - Tertiary:  #00FFFF (Cyan)
 * - Background: #111111
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
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #111111 !important; }
    @media (prefers-color-scheme: dark) {
      body, table, td { background-color: #111111 !important; }
      .text-light { color: #ffffff !important; }
      .text-gray { color: #999999 !important; }
    }
    @media screen and (max-width: 600px) {
      .responsive-table { width: 100% !important; }
      .mobile-pad { padding: 32px 20px !important; }
      .stack-column { display: block !important; width: 100% !important; margin-bottom: 32px !important; text-align: center !important; }
      .h1-text { font-size: 36px !important; }
    }
  </style>
</head>
<body style="background-color: #111111; margin: 0; padding: 0;" bgcolor="#111111">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#111111" style="background-color: #111111; padding: 40px 16px;">
    <tr>
      <td align="center" valign="top">
        <table class="responsive-table" width="600" border="0" cellpadding="0" cellspacing="0" bgcolor="#111111" style="background-color: #111111; max-width: 600px;">

          <!-- HERO -->
          <tr>
            <td class="mobile-pad" align="center" valign="top" bgcolor="#111111" style="background-color: #111111; padding: 56px 48px 40px; border-bottom: 1px solid #2a2a2a;">
              <img src="https://www.iod-shop.com/logo-iod.png" alt="IOD" width="160" style="display: block; margin: 0 auto 36px auto; width: 160px; height: auto;" />
              <h1 class="h1-text text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 44px; font-weight: 700; color: #ffffff; line-height: 1.1; letter-spacing: -1px; margin: 0 0 8px 0; text-align: center;">Du bist dabei.</h1>
              <h1 class="h1-text" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 44px; font-weight: 700; color: #CCFF00; line-height: 1.1; letter-spacing: -1px; margin: 0 0 24px 0; text-align: center;">WIR AUCH.</h1>
              <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 16px; color: #999999; line-height: 1.6; margin: 0; text-align: center;">Danke, dass du dich für den IOD-Launch angemeldet hast. Wir bauen gerade etwas, das die Pumptrack-Welt auf den Kopf stellt.</p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td class="mobile-pad" align="left" valign="top" bgcolor="#111111" style="background-color: #111111; padding: 40px 48px;">
              <p class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 16px 0; letter-spacing: -0.5px;">Hey, wir freuen uns mega!</p>
              <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 15px; color: #999999; line-height: 1.75; margin: 0 0 48px 0;">Deine E-Mail-Adresse (<strong style="color: #ffffff;">${email}</strong>) ist jetzt in unserem Launch-Radar. Sobald der Shop live geht, bist du die Erste / der Erste, der es erfährt – mit exklusivem Early-Bird-Zugang und allem, was dazugehört.</p>

              <!-- 3-Column Icons -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 48px;">
                <tr>
                  <td class="stack-column" width="33%" align="center" valign="top" style="padding: 0 8px; text-align: center;">
                    <div style="display: inline-block; width: 56px; height: 56px; border-radius: 50%; background-color: rgba(204,255,0,0.12); text-align: center; line-height: 56px; font-size: 26px; margin-bottom: 14px;">⚡️</div>
                    <div style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #CCFF00; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px;">Early-Bird</div>
                    <div class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 12px; color: #777777; line-height: 1.5;">Persönlicher Link, bevor der Shop für alle öffnet.</div>
                  </td>
                  <td class="stack-column" width="33%" align="center" valign="top" style="padding: 0 8px; text-align: center;">
                    <div style="display: inline-block; width: 56px; height: 56px; border-radius: 50%; background-color: rgba(255,0,255,0.12); text-align: center; line-height: 56px; font-size: 26px; margin-bottom: 14px;">🛡️</div>
                    <div style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #FF00FF; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px;">Kein Spam</div>
                    <div class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 12px; color: #777777; line-height: 1.5;">Wir schreiben nur, wenn es wirklich was zu sagen gibt.</div>
                  </td>
                  <td class="stack-column" width="33%" align="center" valign="top" style="padding: 0 8px; text-align: center;">
                    <div style="display: inline-block; width: 56px; height: 56px; border-radius: 50%; background-color: rgba(0,255,255,0.10); text-align: center; line-height: 56px; font-size: 26px; margin-bottom: 14px;">🌿</div>
                    <div style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 12px; font-weight: 700; color: #00FFFF; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px;">Nachhaltig</div>
                    <div class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 12px; color: #777777; line-height: 1.5;">Recyceltes Material, für echte Rider designed.</div>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#1A1A1A" style="background-color: #1A1A1A; border-radius: 16px; border: 1px solid #2a2a2a; margin-bottom: 48px;">
                <tr>
                  <td align="center" valign="top" style="padding: 40px 24px;">
                    <h2 class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 12px 0;">Bereit für den Flow?</h2>
                    <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 14px; color: #999999; margin: 0 0 32px 0; line-height: 1.6;">Schau schon mal rein – die Produkte warten auf deinen ersten Blick.</p>
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#CCFF00" style="background-color: #CCFF00; border-radius: 4px;">
                          <a href="https://www.iod-shop.com" target="_blank" style="display: inline-block; padding: 16px 48px; font-family: 'Space Grotesk', Arial, sans-serif; font-size: 14px; font-weight: 700; color: #111111; text-decoration: none; letter-spacing: 1.5px; text-transform: uppercase;">ZUR WEBSEITE</a>
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
                    <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 14px; color: #777777; line-height: 1.7; margin: 0;">Mit Energie &amp; Leidenschaft aus dem Sattel heraus,</p>
                    <p class="text-light" style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 16px; font-weight: 700; color: #ffffff; margin: 12px 0 2px 0;">Das IOD-Team</p>
                    <p class="text-gray" style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 12px; color: #555555; margin: 0;">Inside Out Design · Pumptrack Pads, DACH</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="mobile-pad" align="center" valign="top" bgcolor="#0a0a0a" style="background-color: #0a0a0a; padding: 32px 48px; border-top: 1px solid #222222;">
              <img src="https://www.iod-shop.com/logo-iod.png" alt="IOD" width="60" style="display: block; margin: 0 auto 16px auto; width: 60px; height: auto; opacity: 0.4;" />
              <p style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; font-size: 11px; color: #444444; line-height: 1.8; margin: 0; text-align: center;">
                Du erhältst diese E-Mail, weil du dich für unsere Launch-Benachrichtigung angemeldet hast.<br />
                Keine weiteren E-Mails erwünscht? <a href="https://www.iod-shop.com/unsubscribe?email=${email}" style="color: #666666; text-decoration: underline;">Hier abmelden.</a><br /><br />
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
