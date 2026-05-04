import { type ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  title?: string;
  childrenClassName?: string;
  className?: string;
};

export default function Card({
  children,
  title,
  childrenClassName,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "from-card to-card/60 flex flex-col gap-4 rounded-xl border bg-linear-to-br p-4 shadow-md 2xl:h-full dark:border-none",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div
        className={clsx(
          childrenClassName,
          "animate-[fade-in_1s_ease-out_forwards] 2xl:flex-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}
