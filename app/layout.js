import './globals.css';
import { UserAuthProvider } from '@/contexts/UserAuthContext';
import PageTitleUpdater from '@/Components/PageTitleUpdater';

export const metadata = {
  title: 'Sprout Research',
  description:
    'Independent quality stock research with fundamental analysis, forensic scrutiny, and risk-focused investment insights.',
  icons: {
    icon: '/favicon.png',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <UserAuthProvider>
          <PageTitleUpdater />
          {children}
        </UserAuthProvider>
      </body>
    </html>
  );
}
