import { siteInfo } from '@/api/footerData';

export const openEmail = (
  subject = 'Business Inquiry',
  body = 'Hi there...'
) => {
  const email = siteInfo.email;
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  const url = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  window.location.href = url;
};
