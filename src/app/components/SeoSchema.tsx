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
            'Ahken Labs is a full-service digital agency dedicated to transforming brands through innovation and strategy. We specialize in Web and Mobile App Development, building responsive, high-performance platforms tailored to your business goals. Beyond development, we elevate your online presence with data-driven Digital Marketing, SEO (Search Engine Optimization), and cutting-edge AIEO (AI Engine Optimization) to ensure you are found by the right audience. Our creative team delivers compelling Brand Identity Development and Storytelling, crafting unique narratives that resonate with customers. Partner with Ahken Labs for end-to-end digital solutions that drive growth.',
        }),
      }}
    />
  );
}
