import "./globals.css";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Providers from "@/components/shared/Providers";

export const metadata = {
  title: {
    default: "DocAppoint | Doctor Appointment Manager",
    template: "%s | DocAppoint",
  },
  description:
    "Book doctors online, manage appointments, and update your profile with DocAppoint.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <Providers>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
