import StoreProvider from "@/redux/provider";
import Header from "@/app/components/Header";
import "./globals.css";

export const metadata = {
  title: "Strands frontend test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
