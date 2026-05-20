import { Suspense } from "react";

import Loading from "@/components/shared/Loading";

export const metadata = {
  title: "Login",
  description: "Sign in to your DocAppoint account.",
};

export default function LoginLayout({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
