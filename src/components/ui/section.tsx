import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-6 md:py-8 xl:py-10", className)} {...props} />;
}
