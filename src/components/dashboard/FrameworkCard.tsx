import { FrameworkScore } from "@/types/analysis";
import { ScoreGauge } from "./ScoreGauge";
import { ChevronRight, Lightbulb } from "lucide-react";

interface FrameworkCardProps {
  framework: FrameworkScore;
  frameworkKey: 'bersin' | 'gartner' | 'ulrich';
}

const frameworkColors = {
  bersin: 'from-[hsl(186,72%,45%)] to-[hsl(186,72%,35%)]',
  gartner: 'from-[hsl(160,84%,39%)] to-[hsl(160,84%,29%)]',
  ulrich: 'from-[hsl(280,65%,55%)] to-[hsl(280,65%,45%)]',
};

const frameworkBadgeColors = {
  bersin: 'bg-[hsl(186,72%,45%)/0.2] text-[hsl(186,72%,55%)]',
  gartner: 'bg-[hsl(160,84%,39%)/0.2] text-[hsl(160,84%,50%)]',
  ulrich: 'bg-[hsl(280,65%,55%)/0.2] text-[hsl(280,65%,65%)]',
};

export const FrameworkCard = ({ framework, frameworkKey }: FrameworkCardProps) => {
  return (
    <div className="metric-card hover-lift group cursor-pointer">
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`framework-badge ${frameworkBadgeColors[frameworkKey]}`}>
              {frameworkKey === 'bersin' ? 'Josh Bersin' : 
               frameworkKey === 'gartner' ? 'Gartner' : 'Dave Ulrich'}
            </span>
            <h3 className="font-serif text-lg font-semibold mt-2">
              {framework.name}
            </h3>
          </div>
          <ScoreGauge score={framework.score} size="sm" showLabel={false} />
        </div>

        {/* Status */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${
          framework.status === 'aligned' 
            ? 'bg-success/10 text-success' 
            : framework.status === 'partial'
              ? 'bg-warning/10 text-warning'
              : 'bg-destructive/10 text-destructive'
        }`}>
          <span className={`h-2 w-2 rounded-full ${
            framework.status === 'aligned' 
              ? 'bg-success' 
              : framework.status === 'partial'
                ? 'bg-warning'
                : 'bg-destructive'
          }`} />
          {framework.status === 'aligned' ? 'Aligned' : 
           framework.status === 'partial' ? 'Partially Aligned' : 'Needs Improvement'}
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
          {framework.description}
        </p>

        {/* Top Recommendation */}
        {framework.recommendations.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border/50">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground/80">
                {framework.recommendations[0]}
              </span>
            </div>
          </div>
        )}

        {/* View More */}
        <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          View detailed analysis
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </div>

      {/* Gradient accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${frameworkColors[frameworkKey]} opacity-50 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
};
