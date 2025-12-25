import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon?: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

const variantStyles = {
  default: 'from-primary/10 to-primary/5 border-primary/20',
  success: 'from-success/10 to-success/5 border-success/20',
  warning: 'from-warning/10 to-warning/5 border-warning/20',
  destructive: 'from-destructive/10 to-destructive/5 border-destructive/20',
};

const iconVariantStyles = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
};

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon: Icon,
  variant = 'default' 
}: MetricCardProps) {
  const TrendIcon = trend ? (trend.value > 0 ? TrendingUp : trend.value < 0 ? TrendingDown : Minus) : null;
  const trendColor = trend ? (trend.value > 0 ? 'text-success' : trend.value < 0 ? 'text-destructive' : 'text-muted-foreground') : '';

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-lg",
      "bg-gradient-to-br",
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-serif tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("p-3 rounded-xl", iconVariantStyles[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      
      {trend && TrendIcon && (
        <div className={cn("flex items-center gap-1 mt-4 text-sm", trendColor)}>
          <TrendIcon className="h-4 w-4" />
          <span className="font-medium">{Math.abs(trend.value)}%</span>
          <span className="text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
