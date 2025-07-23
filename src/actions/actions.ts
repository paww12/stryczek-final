'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function SendMail(prevState: unknown, formData: FormData) {
  const payload = await getPayload({ config: configPromise })
  const subject = formData.get('subject')
  const textBody = formData.get('text')
  const adresee = formData.get('adresee')
  if (!adresee || typeof adresee !== 'string') {
    throw new Error('Podaj adres email')
  }
  try {
    await payload.sendEmail({
      // to: adresee,
      to: 'aleks3650@interia.pl',
      subject: subject as string,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 10px auto;">
            <h1 style="color: #2563eb;">Słodka Pętelka</h1>
            <p style="font-size: 16px; line-height: 1.5;">
              Sprawdź naszą stronę: 
              <a href="https://slodkapetelka.pl" style="color:rgb(255, 44, 150); text-decoration: none;">
                Słodka Pętelka :D 
              </a>
            </p>
            <div style="background-color: #f3f4f6; padding: 20px; margin-top: 20px; border-radius: 8px;">
              <p style="margin: 0;">${textBody}</p>
            </div>
            <p style="font-size: 16px; line-height: 1.5;">
              Wiadomość wysłana od: ${adresee} 
            </p>
          </body>
        </html>
`,
    })
    return {
      success: true,
      message: 'Email wysłany pomyślnie',
    }
  } catch (error) {
    return {
      success: false,
      message: error,
    }
  }
}
