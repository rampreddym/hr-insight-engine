import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
}

export const ScoreGauge = ({ score, size = "md", showLabel = true, label }: ScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-44 h-44",
  };

  const strokeWidth = size === "sm" ? 6 : size === "md" ? 8 : 10;
  const radius = size === "sm" ? 32 : size === "md" ? 52 : 72;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - animatedScore) / 100) * circumference;

  const getScoreColor = (s: number) => {
    if (s >= 75) return "hsl(var(--success))";
    if (s >= 50) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getScoreLabel = (s: number) => {
    if (s >= 75) return "Aligned";
    if (s >= 50) return "Partial";
    return "Needs Work";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}>
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke={getScoreColor(animatedScore)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getScoreColor(animatedScore)}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="stat-highlight"
            style={{ 
              fontSize: size === "sm" ? "1.25rem" : size === "md" ? "2rem" : "2.75rem",
              color: getScoreColor(animatedScore),
            }}
          >
            {Math.round(animatedScore)}
          </span>
          {showLabel && size !== "sm" && (
            <span className="text-xs text-muted-foreground font-medium mt-1">
              {getScoreLabel(animatedScore)}
            </span>
          )}
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  );
};
