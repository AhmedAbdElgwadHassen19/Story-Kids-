import { Geist, Geist_Mono ,Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: [ "300","400","500" , "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kids Story",
  description: "Create magical stories for your children with the power of AI.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
