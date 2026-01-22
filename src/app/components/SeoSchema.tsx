export default function SeoSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Ahken Labs',
          url: 'https://ahkenlabs.com',
          logo: 'https://ahkenlabs.com/icon.png',
          description:
            'Ahken Labs is a software development company building modern web and mobile applications using modern technologies.',
        }),
      }}
    />
  );
}
