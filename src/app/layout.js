import "./globals.css";

import Navbar from "@/components/shared/Navbar";

export const metadata = {
  title: "DocAppoint",
  description: "Doctor Appointment Platform",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  );
}