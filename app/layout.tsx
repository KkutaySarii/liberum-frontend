import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


const myFont = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },

    
    
  ],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Liberum",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={myFont.className}
      >
        {children}
      </body>
    </html>
  );
}
