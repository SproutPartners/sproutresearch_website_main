'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const titles = {
  '/': 'About Sprout Research | Independent Quality Stock Research',
  '/Charter': 'Investor Charter | Sprout Research',
  '/Contact': 'Contact Sprout Research | Sprout Research',
  '/Report': 'Investor Grievance Report | Sprout Research',
  '/Refund_Cancellation': 'Refund and Cancellation Policy | Sprout Research',
  '/Research/Retail': 'Retail Research Services | Sprout Research',
  '/Research/Pcg': 'Private Clients Group Research | Sprout Research',
  '/Insights': 'Market Insights | Sprout Research',
  '/PrivacyPolicy': 'Privacy Policy | Sprout Research',
  '/pricing': 'Product Pricing | Sprout Research',
  '/Disclaimer': 'Disclaimer | Sprout Research',
  '/Grievance': 'Investor Grievance | Sprout Research',
  '/Terms': 'Terms and Conditions | Sprout Research',
  '/login': 'Retail Portal Login | Sprout Research',
}

export default function DynamicDocumentTitle() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return
    const title = titles[pathname] || (pathname.startsWith('/Insights/') ? 'Insight Article | Sprout Research' : 'Sprout Research')
    document.title = title
  }, [pathname])

  return null
}
