// app/layout.tsx
import './globals.css';
import Header from '@/components/Header/Header';
import LoadingOverlay from '@/components/LoadingOverlay';
import SeoSchema from './components/SeoSchema';

export const metadata = {
  title: {
    default: 'Ahken Labs – Web & Mobile Software Development',
    template: '%s | Ahken Labs',
  },
  description:
    'Ahken Labs is a software development company building modern web and mobile applications using modern technologies.',

  verification: {
    google: '445-F5EhUJaIkoqFInlYY3a5CYizoAg6mLwVywxM-UA',
  },

  alternates: {
    canonical: 'https://ahkenlabs.com',
  },

  openGraph: {
    title: 'Ahken Labs',
    description:
      'Modern web and mobile software development studio.',
    url: 'https://ahkenlabs.com',
    siteName: 'Ahken Labs',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SeoSchema />
        <LoadingOverlay />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
