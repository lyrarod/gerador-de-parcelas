import "@/styles/globals.css";

export const metadata = {
  title: "IPTU | Controle de pagamentos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
