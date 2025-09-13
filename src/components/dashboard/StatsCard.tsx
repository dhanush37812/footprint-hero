import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  progress?: number;
  goal?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
}

export const StatsCard = ({
  title,
  value,
  subtitle,
  change,
  progress,
  goal,
  icon,
  variant = "default"
}: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "destructive":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "";
    }
  };

  const getTrendIcon = () => {
    if (change === undefined) return null;
    return change > 0 ? (
      <TrendingUp className="h-4 w-4 text-destructive" />
    ) : (
      <TrendingDown className="h-4 w-4 text-success" />
    );
  };

  return (
    <Card className={cn("nature-shadow eco-transition hover:scale-[1.02]", getVariantStyles())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon || <Zap className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Main Value */}
          <div className="flex items-end space-x-2">
            <div className="text-2xl font-bold counter-up">{value}</div>
            {change !== undefined && (
              <div className="flex items-center space-x-1">
                {getTrendIcon()}
                <span className={cn(
                  "text-xs font-medium",
                  change > 0 ? "text-destructive" : "text-success"
                )}>
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}

          {/* Progress Bar */}
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                {goal && <span className="text-muted-foreground">{goal}</span>}
              </div>
              <Progress 
                value={progress} 
                className="h-2 progress-grow"
                style={{ "--progress-width": `${progress}%` } as React.CSSProperties}
              />
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Target className="h-3 w-3" />
                <span>{progress}% of monthly goal</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};