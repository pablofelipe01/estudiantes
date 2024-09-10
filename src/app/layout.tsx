import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assistant IA",
  description: "Asistente de reunion con IA",
  metadataBase: new URL('https://estudiantes-2.vercel.app/'),
  themeColor: '#ffffff',
};
// @ts-ignore
export const headers = {
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' https://js.stripe.com https://m.stripe.network 'unsafe-inline' 'unsafe-eval';
    style-src 'self' https://m.stripe.network 'unsafe-inline';
    img-src 'self' https://m.stripe.network https://m.stripe.com https://b.stripecdn.com https://cdn.jsdelivr.net;
    connect-src 'self' https://api.stripe.com;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
  `.replace(/\s{2,}/g, ' ').trim()
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <video autoPlay muted loop className="video-background">
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
          <Script
            src="https://js.stripe.com/v3/"
            strategy="lazyOnload"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}