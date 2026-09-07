import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
};

export function Text({ children, className, as: Tag = "p" }: Props) {
  return <Tag className={cn("m-0", className)}>{children}</Tag>;
}
