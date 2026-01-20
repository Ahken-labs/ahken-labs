import { fetchSiteInfo } from '@/api/footerData';

export const openWhatsApp = async (message = 'Hi there...') => {
  const siteInfo = await fetchSiteInfo();
  if (!siteInfo?.phone) return;

  const phone = siteInfo.phone.replace(/\s+/g, '').replace('+', '');
  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};
