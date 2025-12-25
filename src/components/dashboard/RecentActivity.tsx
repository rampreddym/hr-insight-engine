import { CheckCircle2, AlertCircle, XCircle, Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const activities = [
  {
    id: 1,
    type: "success",
    title: "L&D Framework Aligned",
    description: "Learning processes now meet Josh Bersin standards",
    time: "2 hours ago",
    score: 88,
  },
  {
    id: 2,
    type: "warning",
    title: "Compensation Review Pending",
    description: "Pay equity analysis requires attention",
    time: "5 hours ago",
    score: 65,
  },
  {
    id: 3,
    type: "error",
    title: "Performance Management Gap",
    description: "Annual review cycle below Gartner benchmark",
    time: "1 day ago",
    score: 45,
  },
  {
    id: 4,
    type: "info",
    title: "New Analysis Completed",
    description: "Workforce planning report generated",
    time: "2 days ago",
    score: 58,
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "success":
      return CheckCircle2;
    case "warning":
      return AlertCircle;
    case "error":
      return XCircle;
    default:
      return Clock;
  }
};

const getActivityColors = (type: string) => {
  switch (type) {
    case "success":
      return "text-success bg-success/10";
    case "warning":
      return "text-warning bg-warning/10";
    case "error":
      return "text-destructive bg-destructive/10";
    default:
      return "text-primary bg-primary/10";
  }
};

export function RecentActivity() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-lg font-semibold">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest process updates</p>
        </div>
        <Button variant="ghost" size="sm">
          View All
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const colors = getActivityColors(activity.type);

          return (
            <div 
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${colors}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {activity.description}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-semibold ${
                  activity.score >= 75 ? 'text-success' :
                  activity.score >= 50 ? 'text-warning' : 'text-destructive'
                }`}>
                  {activity.score}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
