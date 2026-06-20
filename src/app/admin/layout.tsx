import '../globals.css';

export const metadata = {
  title: 'Sezkon Admin',
  description: 'Sezkon Blog Yönetim Paneli',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
