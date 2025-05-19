'use server'

import nodemailer from 'nodemailer'

export async function sendEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    // Create a test SMTP service account
    const testAccount = await nodemailer.createTestAccount()

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    // Email content
    const mailOptions = {
      from: `"${data.name}" <${data.email}>`,
      to: 'gwynyhagos@gmail.com',
      subject: `Portfolio Contact: ${data.subject}`,
      text: data.message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}