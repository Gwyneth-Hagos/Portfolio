# Portfolio Website

## Contact Form Setup

To enable the contact form functionality, you need to set up EmailJS:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (e.g., Gmail)
3. Create an email template with the following variables:
   - `from_name` - Sender's name
   - `from_email` - Sender's email
   - `subject` - Email subject
   - `message` - Email message
   - `to_email` - Your email (gwynyhagos@gmail.com)
4. Update the `.env.local` file with your EmailJS credentials:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Template Example

Create a template in EmailJS with the following content:

```
New Contact Form Submission

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}
```

Make sure to set the recipient to your email address (gwynyhagos@gmail.com) in the EmailJS template settings.