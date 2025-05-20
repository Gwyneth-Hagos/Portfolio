# Setting Up EmailJS for Your Contact Form

To make your contact form fully functional and receive emails directly in your inbox, follow these steps to set up EmailJS:

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. The free tier allows 200 emails per month, which should be sufficient for your portfolio site

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Name your service "service_portfolio" (or update the code with your chosen service ID)

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person contacting you
   - `{{from_email}}` - Their email address
   - `{{subject}}` - The subject of their message
   - `{{message}}` - The content of their message
4. Name your template ID "template_contact_form" (or update the code with your chosen template ID)

## Step 4: Get Your Public Key

1. Go to "Account" > "API Keys"
2. Copy your "Public Key"

## Step 5: Update Your Code

1. Open `components/contact-form-alternative.tsx`
2. Replace the placeholder values with your actual EmailJS credentials:
   ```typescript
   const EMAILJS_SERVICE_ID = 'your_service_id'; // e.g., 'service_portfolio'
   const EMAILJS_TEMPLATE_ID = 'your_template_id'; // e.g., 'template_contact_form'
   const EMAILJS_PUBLIC_KEY = 'your_public_key'; // e.g., 'user_abc123'
   ```

## Step 6: Test Your Form

1. Fill out the contact form on your site
2. Submit the form
3. Check your email inbox to confirm you received the message

## Troubleshooting

If the form doesn't work:
1. Check the browser console for errors
2. Verify your EmailJS credentials are correct
3. Make sure your email template variables match the ones in the code
4. Check if you've reached your monthly email limit

The form has a fallback mechanism that will open the user's email client if EmailJS fails, ensuring you don't miss any messages.