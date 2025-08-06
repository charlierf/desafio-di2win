import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  variant?: "default" | "danger" | "warning" | "success";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
}

const variantStyles = {
  default: "bg-gradient-primary text-primary-foreground",
  danger: "bg-gradient-danger text-destructive-foreground",
  warning: "bg-gradient-warning text-warning-foreground", 
  success: "bg-gradient-success text-success-foreground"
};

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  variant = "default", 
  trend,
  className 
}: StatsCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg p-6 shadow-card transition-smooth hover:shadow-elegant",
      "bg-card text-card-foreground border border-border/50",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center text-sm font-medium",
              trend.direction === "up" ? "text-success" : "text-destructive"
            )}>
              <span className={cn(
                "mr-1",
                trend.direction === "up" ? "↗" : "↘"
              )}>
                {trend.direction === "up" ? "↗" : "↘"}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg",
          variantStyles[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}