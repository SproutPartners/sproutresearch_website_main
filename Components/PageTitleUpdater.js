'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PAGE_TITLES = {
  '/': 'About Sprout Research | Independent Quality Stock Research',
  '/Charter': 'Investor Charter | Sprout Research',
  '/Contact': 'Contact Sprout Research | Sprout Research',
  '/Disclaimer': 'Disclaimer | Sprout Research',
  '/Grievance': 'Investor Grievance | Sprout Research',
  '/Insights': 'Market Insights | Sprout Research',
  '/login': 'Retail Portal Login | Sprout Research',
  '/pricing': 'Product Pricing | Sprout Research',
  '/PrivacyPolicy': 'Privacy Policy | Sprout Research',
  '/Refund_Cancellation': 'Refund and Cancellation Policy | Sprout Research',
  '/Report': 'Investor Grievance Report | Sprout Research',
  '/Research/Pcg': 'Private Clients Group Research | Sprout Research',
  '/Research/Retail': 'Retail Research Services | Sprout Research',
  '/Terms': 'Terms and Conditions | Sprout Research',
};

export default function PageTitleUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const title =
      PAGE_TITLES[pathname] ||
      (pathname.startsWith('/Insights/') ? 'Insight Article | Sprout Research' : 'Sprout Research');

    document.title = title;
  }, [pathname]);

  return null;
}
