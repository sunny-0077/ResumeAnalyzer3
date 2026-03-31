import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Manrope } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import Toasts from '@/components/ui/Toasts';
import CommandPalette from '@/components/ui/CommandPalette';
import ShareModal from '@/components/ui/ShareModal';
import UpgradeModal from '@/components/ui/UpgradeModal';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

import InDepthAnalysisModal from '@/components/ui/InDepthAnalysisModal';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Hirely AI — Next Level Career Intelligence',
  description: 'AI-Powered Career Intelligence',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} ${manrope.variable}`}>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <AuthProvider>
          <Toasts />
          <CommandPalette />
          <ShareModal />
          <UpgradeModal />
          <InDepthAnalysisModal />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
