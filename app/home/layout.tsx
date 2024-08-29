import Header from "@/components/ui/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header></Header>
          {children}
    </>
  );
}