//app/layout.tsx
import './globals.css';
import Header from '@/components/Header/Header';
import LoadingOverlay from '@/components/LoadingOverlay';

export const metadata = {
  title: 'Ahken Labs',
  description: 'Ahken Labs website',
  verification: {
    google: '445-F5EhUJaIkoqFInlYY3a5CYizoAg6mLwVywxM-UA',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
    >
      <body>
        <LoadingOverlay />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
