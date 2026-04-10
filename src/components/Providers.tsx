"use client";

import { RequestFormProvider } from "@/components/sections/RequestForm";

export function Providers({ children }: { children: React.ReactNode }) {
  return <RequestFormProvider>{children}</RequestFormProvider>;
}
