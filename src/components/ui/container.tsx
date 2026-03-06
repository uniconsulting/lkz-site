import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-8",
        className,
      )}
      {...props}
    />
  );
}
