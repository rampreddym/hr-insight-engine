import { ProcessAnalysis } from "@/types/analysis";
import { ScoreGauge } from "./ScoreGauge";
import { FrameworkCard } from "./FrameworkCard";
import { ChevronDown, ChevronUp, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProcessCardProps {
  process: ProcessAnalysis;
}

export const ProcessCard = ({ process }: ProcessCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const StatusIcon = process.status === 'aligned' 
    ? CheckCircle 
    : process.status === 'partial' 
      ? Activity 
      : AlertTriangle;

  const statusColors = {
    aligned: 'text-success bg-success/10',
    partial: 'text-warning bg-warning/10',
    misaligned: 'text-destructive bg-destructive/10',
  };

  return (
    <div className="glass-card overflow-hidden fade-in">
      {/* Header */}
      <div 
        className="p-6 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${statusColors[process.status]}`}>
              <StatusIcon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">{process.processName}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {process.logs.length} events captured • Last activity: {
                  process.logs.length > 0 
                    ? new Date(process.logs[0].timestamp).toLocaleDateString()
                    : 'N/A'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <ScoreGauge score={process.overallScore} size="sm" />
            <Button variant="ghost" size="icon">
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border/50">
          {/* Framework Scores */}
          <div className="p-6 bg-secondary/20">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Framework Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FrameworkCard framework={process.frameworks.bersin} frameworkKey="bersin" />
              <FrameworkCard framework={process.frameworks.gartner} frameworkKey="gartner" />
              <FrameworkCard framework={process.frameworks.ulrich} frameworkKey="ulrich" />
            </div>
          </div>

          {/* Recent Logs */}
          {process.logs.length > 0 && (
            <div className="p-6 border-t border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Recent Process Logs
              </h4>
              <div className="space-y-2">
                {process.logs.map((log) => (
                  <div 
                    key={log.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <span className="text-sm font-medium">{log.action}</span>
                      <span className="text-sm text-muted-foreground">• {log.details}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
