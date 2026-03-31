"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type LoginTransitionContextType = {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
};

const LoginTransitionContext = createContext<LoginTransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
  endTransition: () => {},
});

export function LoginTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <LoginTransitionContext.Provider
      value={{
        isTransitioning,
        startTransition: () => setIsTransitioning(true),
        endTransition: () => setIsTransitioning(false),
      }}
    >
      {children}
    </LoginTransitionContext.Provider>
  );
}

export function useLoginTransition() {
  return useContext(LoginTransitionContext);
}
