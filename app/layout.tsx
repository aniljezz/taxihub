import "./globals.css";

export const metadata = {
  title: "Taxihub",
  description: "Taxihub SaaS tool",
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
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
