import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function MetricCard({ title, children, className, headerAction }: MetricCardProps) {
  return (
    <div className={cn(
      "rounded-lg border border-border/50 bg-card p-6 shadow-card transition-smooth hover:shadow-elegant",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        {headerAction}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}