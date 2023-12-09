import '../styles/globals.css';

import { M_PLUS_1 } from 'next/font/google';

const mPlus1 = M_PLUS_1({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Notion Next.js blog',
  description: 'Notion Next.js blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={mPlus1.className}>
        {children}
      </body>
    </html>
  );
}
