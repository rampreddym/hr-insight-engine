import { Recommendation } from "@/types/analysis";
import { ArrowUpRight, Zap, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

const priorityConfig = {
  high: {
    badge: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: 'text-destructive',
  },
  medium: {
    badge: 'bg-warning/10 text-warning border-warning/20',
    icon: 'text-warning',
  },
  low: {
    badge: 'bg-success/10 text-success border-success/20',
    icon: 'text-success',
  },
};

const effortLabels = {
  low: '1-2 weeks',
  medium: '1-2 months',
  high: '3-6 months',
};

export const RecommendationCard = ({ recommendation, index }: RecommendationCardProps) => {
  const config = priorityConfig[recommendation.priority];

  return (
    <div 
      className="glass-card p-6 hover-lift opacity-0 slide-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider border ${config.badge}`}>
            {recommendation.priority} Priority
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground">
            {recommendation.framework}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>

      <h3 className="font-serif text-lg font-semibold mb-2">
        {recommendation.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {recommendation.description}
      </p>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-success" />
          <div>
            <p className="text-xs text-muted-foreground">Expected Impact</p>
            <p className="text-sm font-medium text-success">{recommendation.impact}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Implementation</p>
            <p className="text-sm font-medium">{effortLabels[recommendation.effort]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
