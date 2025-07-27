import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import nodemailer from 'nodemailer'
import 'dotenv/config'

export const emailAdapter = nodemailerAdapter({
  defaultFromAddress: 'paww91@gmail.com',
  defaultFromName: 'Słodka Pętelka formularz',
  transport: nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  }),
})
