# Setting Up Web3Forms for Your Contact Form

To make your contact form fully functional and receive emails directly in your inbox, follow these steps to set up Web3Forms:

## Step 1: Create a Web3Forms Access Key

1. Go to [Web3Forms.com](https://web3forms.com/)
2. Click "Get Access Key" or sign up for an account
3. You'll receive a unique access key that you can use in your form

## Step 2: Update Your Code

1. Open `components/contact-form-alternative.tsx`
2. Replace the placeholder value with your actual Web3Forms access key:
   ```typescript
   const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
   ```

## Step 3: Configure Email Settings (Optional)

1. In your Web3Forms dashboard, you can configure:
   - Email templates
   - Spam protection
   - Success/error pages
   - Webhook integrations

## Step 4: Test Your Form

1. Fill out the contact form on your site
2. Submit the form
3. Check your email inbox to confirm you received the message

## Benefits of Web3Forms

- **Free tier**: 50 submissions per month
- **No account required**: Just use the access key
- **Simple setup**: No complex configuration
- **Spam protection**: Built-in protection against spam
- **File uploads**: Supports file attachments (if needed)
- **Custom redirects**: Can redirect to custom success/error pages
- **Webhook support**: Can integrate with other services

## Troubleshooting

If the form doesn't work:
1. Check the browser console for errors
2. Verify your Web3Forms access key is correct
3. Make sure you're not exceeding the free tier limits

The form has a fallback mechanism that will open the user's email client if Web3Forms fails, ensuring you don't miss any messages.