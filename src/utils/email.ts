import { fetchSiteInfo } from '@/api/footerData';

export const openEmail = async (
  subject = 'Business Inquiry',
  body = 'Hi there...'
) => {
  const siteInfo = await fetchSiteInfo();
  const email = siteInfo?.email;
  if (!email) return;

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const url = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  window.location.href = url;
};
