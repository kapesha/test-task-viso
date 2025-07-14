'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Provider } from "react-redux";
import store from "@/store/store";
import { AuthLoader } from "@/components/AuthLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store} >
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header />
          <AuthLoader />
          {children}
        </body>
      </Provider>

    </html>
  );
}
