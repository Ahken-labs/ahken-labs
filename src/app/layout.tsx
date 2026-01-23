// app/layout.tsx
import './globals.css';
import Header from '@/components/Header/Header';
import LoadingOverlay from '@/components/LoadingOverlay';
import SeoSchema from './components/SeoSchema';

export const metadata = {
  title: {
    default: 'Ahken Labs',
    template: '%s | Ahken Labs',
  },
  description:
    'Ahken Labs is a full-service digital agency dedicated to transforming brands through innovation and strategy. We specialize in Web and Mobile App Development, building responsive, high-performance platforms tailored to your business goals. Beyond development, we elevate your online presence with data-driven Digital Marketing, SEO (Search Engine Optimization), and cutting-edge AIEO (AI Engine Optimization) to ensure you are found by the right audience. Our creative team delivers compelling Brand Identity Development and Storytelling, crafting unique narratives that resonate with customers. Partner with Ahken Labs for end-to-end digital solutions that drive growth.',

  verification: {
    google: '445-F5EhUJaIkoqFInlYY3a5CYizoAg6mLwVywxM-UA',
  },

  alternates: {
    canonical: 'https://ahkenlabs.com',
  },

  openGraph: {
    title: 'Ahken Labs',
    description:
      'Ahken Labs is a full-service digital agency dedicated to transforming brands through innovation and strategy. We specialize in Web and Mobile App Development, building responsive, high-performance platforms tailored to your business goals. Beyond development, we elevate your online presence with data-driven Digital Marketing, SEO (Search Engine Optimization), and cutting-edge AIEO (AI Engine Optimization) to ensure you are found by the right audience. Our creative team delivers compelling Brand Identity Development and Storytelling, crafting unique narratives that resonate with customers. Partner with Ahken Labs for end-to-end digital solutions that drive growth.',
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
