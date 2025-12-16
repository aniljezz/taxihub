import "./globals.css";

export const metadata = {
  title: "Taxihub",
  description: "Taxihub SaaS tool",
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111827" />
      </head>
      <body className="bg-layout-bg">{children}</body>
    </html>
  );
}
