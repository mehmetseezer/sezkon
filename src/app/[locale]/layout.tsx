import { Inter } from 'next/font/google';
import "../globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return [{locale: 'tr'}, {locale: 'en'}];
}

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ 
  children,
  params
}: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  if (!['tr', 'en'].includes(locale)) {
    notFound();
  }

  // Ensure statically rendered paths can be generated correctly
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}