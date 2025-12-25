import { AlertTriangle, ArrowRight, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const insights = [
  {
    id: 1,
    type: "alert",
    title: "Performance Review Cycle Outdated",
    description: "Annual review process is 42% below industry benchmark. Consider implementing continuous feedback.",
    impact: "High Impact",
    action: "View Recommendations",
  },
  {
    id: 2,
    type: "opportunity",
    title: "Skills Taxonomy Gap Identified",
    description: "Your hiring process lacks skills-based matching. This affects time-to-productivity by 40%.",
    impact: "Quick Win",
    action: "Implement Now",
  },
  {
    id: 3,
    type: "trend",
    title: "L&D Engagement Increasing",
    description: "Learning completion rates improved 15% this quarter. Maintain current momentum.",
    impact: "Positive Trend",
    action: "View Details",
  },
];

const getInsightIcon = (type: string) => {
  switch (type) {
    case "alert":
      return AlertTriangle;
    case "opportunity":
      return Zap;
    default:
      return Clock;
  }
};

const getInsightColors = (type: string) => {
  switch (type) {
    case "alert":
      return { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" };
    case "opportunity":
      return { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" };
    default:
      return { bg: "bg-success/10", text: "text-success", border: "border-success/20" };
  }
};

export function InsightsPanel() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-lg font-semibold">AI-Powered Insights</h3>
          <p className="text-sm text-muted-foreground">Top recommendations for improvement</p>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const colors = getInsightColors(insight.type);

          return (
            <div 
              key={insight.id}
              className={`p-4 rounded-xl border ${colors.border} ${colors.bg} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${colors.bg}`}>
                  <Icon className={`h-4 w-4 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{insight.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.bg} ${colors.text}`}>
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {insight.description}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  {insight.action}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
