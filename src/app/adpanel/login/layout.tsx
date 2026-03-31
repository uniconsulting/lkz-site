import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
