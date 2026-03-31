import type { ReactNode } from "react";
import { LoginTransitionProvider } from "@/lib/login-transition-context";
import { LoginTransitionOverlay } from "@/components/admin/login-transition-overlay";

export default function AdpanelLayout({ children }: { children: ReactNode }) {
  return (
    <LoginTransitionProvider>
      {children}
      <LoginTransitionOverlay />
    </LoginTransitionProvider>
  );
}
