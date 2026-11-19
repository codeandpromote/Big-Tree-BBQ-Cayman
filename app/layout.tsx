import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Big Tree BBQ — East End, Grand Cayman',
  description:
    'Authentic open-pit barbecue and traditional Caymanian home cooking served beneath the shade tree in Gun Bay, East End, Grand Cayman.',
  openGraph: {
    title: 'Big Tree BBQ — East End, Grand Cayman',
    description:
      'Authentic open-pit barbecue and traditional Caymanian home cooking served beneath the shade tree in Gun Bay, East End, Grand Cayman.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big Tree BBQ — East End, Grand Cayman',
    description:
      'Authentic open-pit barbecue and traditional Caymanian home cooking served beneath the shade tree in Gun Bay, East End, Grand Cayman.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#F7F6F2] text-[#141312] font-sans selection:bg-[#843E1A] selection:text-[#F7F6F2]"
      >
        {children}
      </body>
    </html>
  );
}
