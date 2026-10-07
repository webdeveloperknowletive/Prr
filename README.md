# Prop Range Realty - Corporate B2B Website

This is a premium, corporate B2B Next.js website built for Prop Range Realty (PRR) to attract and partner with real estate developers, builders, and promoters.

## Tech Stack
- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- Lucide React Icons

## Getting Started

### Installation
Make sure you have Node.js installed, then run:

```bash
npm install
```

### Development Server
Run the development server locally:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build
To create an optimized production build:

```bash
npm run build
```
Then start the production server:
```bash
npm run start
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
Connect your GitHub repository and deploy the project directly to Vercel. 

## Environment Variables
Currently, the website does not require complex environment variables.
If you integrate a service like Resend or Formspree for the "Pitch Your Project" and "Contact" forms, you will need to add those keys to `.env.local`:
```
RESEND_API_KEY=your_resend_api_key_here
```

## Content Customization Guide

Here is where to update the primary details of the website:

- **Phone Number, Email, Address:** Edit `components/layout/Footer.tsx` and `app/contact/page.tsx`
- **WhatsApp Number:** Edit `whatsappNumber` variable in `components/ui/FloatingWhatsApp.tsx`
- **Social Media URLs:** Update the links in `components/layout/Footer.tsx`
- **Company Profile PDF:** Replace the file at `public/documents/prr-company-profile.pdf`
- **Logo:** Open `components/layout/Navbar.tsx` to switch out the text logo with an `<img>` or `next/image` tag when the official logo is available.
- **Projects / Portfolio Data:** Open `data/projects.ts` to add, edit, or remove featured projects.
- **Project Images:** Replace or add images in `public/images/projects/` and update the paths in `data/projects.ts`.
- **Leadership Profiles:** Open `app/about/page.tsx` or create a new leadership section component and place images in `public/leadership/`.
- **Blog / Insights Images:** Update images in `public/images/blog/` and the paths in `app/insights/page.tsx`.

## Form Integrations
The forms on the **Pitch Your Project** and **Contact** pages are currently UI templates. To make them functional, we recommend using [Formspree](https://formspree.io/) (for a no-code solution) or [Resend](https://resend.com/) (using Next.js server actions). 

- **Formspree Setup:** Add the Formspree endpoint URL to the `action` attribute of the `<form>` tags.
- **Resend Setup:** Create a Server Action in a new `actions/` folder, and pass the form data to it to send the email securely.
