// app/layout.js
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "../components/Header.js";

export const metadata = {
  title: "Uber Clone",
  description: "Uber clone using Clerk + Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {/* children are always rendered, each page decides if it’s protected */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
