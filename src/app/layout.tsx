//app/layout.tsx
import './globals.css';
import Header from '@/components/Header/Header';
import LoadingOverlay from '@/components/LoadingOverlay';

export const metadata = {
  title: 'Ahken Labs',
  description: 'Ahken Labs website',
  verification: {
    google: 'QRTF8gQi_4FSCV53iEuKpuKl3tBzRtVTzO13cFJIdIQ',
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
