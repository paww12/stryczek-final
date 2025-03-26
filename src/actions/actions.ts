'use server'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function SendMail(prevState: unknown, formData: FormData) {
  console.log('first')
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  //   await new Promise((resolve) => setTimeout(resolve, 1000))
  const subject = formData.get('subject')
  const textBody = formData.get('text')
  const adresee = formData.get('adresee')
  console.log(adresee, subject, textBody)
  if (!adresee || typeof adresee !== 'string') {
    throw new Error('Podaj adres email.')
  }
  try {
    await payload.sendEmail({
      to: adresee,
      subject: subject as string,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 10px auto;">
            <h1 style="color: #2563eb;">Elegancki mailung</h1>
            <p style="font-size: 16px; line-height: 1.5;">
              Sprawdź naszą stronę: 
              <a href="https://slodkapetelka.pl" style="color:rgb(255, 44, 150); text-decoration: none;">
                Słodka Pętelka :D 
              </a>
            </p>
            <div style="background-color: #f3f4f6; padding: 20px; margin-top: 20px; border-radius: 8px;">
              <p style="margin: 0;">${textBody}</p>
            </div>
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
