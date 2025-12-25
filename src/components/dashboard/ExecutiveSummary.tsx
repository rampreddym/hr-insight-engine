import { AnalysisResults } from "@/types/analysis";
import { ScoreGauge } from "./ScoreGauge";
import { TrendingUp, TrendingDown, Minus, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface ExecutiveSummaryProps {
  results: AnalysisResults;
}

export const ExecutiveSummary = ({ results }: ExecutiveSummaryProps) => {
  const metrics = [
    {
      label: "Aligned",
      value: results.alignedCount,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Partial",
      value: results.partialCount,
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "Needs Work",
      value: results.misalignedCount,
      icon: XCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="glass-card p-8 fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Score Section */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <ScoreGauge score={results.overallScore} size="lg" label="Overall Score" />
          <div className="flex items-center gap-2 text-sm">
            {results.overallScore >= 70 ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : results.overallScore >= 50 ? (
              <Minus className="h-4 w-4 text-warning" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className="text-muted-foreground">
              {results.overallScore >= 70 
                ? 'Above industry average' 
                : results.overallScore >= 50 
                  ? 'Meeting baseline standards'
                  : 'Below industry average'}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1">
          <h2 className="font-serif text-2xl font-semibold mb-4">
            Executive Summary
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {results.executiveSummary}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <div 
                key={metric.label}
                className={`flex items-center gap-3 p-4 rounded-xl ${metric.bgColor}`}
              >
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
                <div>
                  <p className={`text-2xl font-bold font-serif ${metric.color}`}>
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
