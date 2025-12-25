import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { HealthScoreChart } from "@/components/dashboard/HealthScoreChart";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { ProcessBarChart } from "@/components/dashboard/ProcessBarChart";
import { InsightsPanel } from "@/components/dashboard/InsightsPanel";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ReportExport } from "@/components/dashboard/ReportExport";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

const Dashboard = () => {
  const handleExport = async (email: string, company: string) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Exporting report to:", email, "for company:", company);
  };

  return (
    <DashboardLayout
      title="HR Process Intelligence"
      subtitle="Real-time analysis powered by Josh Bersin, Gartner, and Dave Ulrich frameworks"
    >
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Overall Score"
          value="67%"
          subtitle="Across all frameworks"
          trend={{ value: 12, label: "vs last month" }}
          icon={Target}
          variant="default"
        />
        <MetricCard
          title="Processes Analyzed"
          value="24"
          subtitle="4 need attention"
          trend={{ value: 8, label: "new this week" }}
          icon={BarChart3}
          variant="success"
        />
        <MetricCard
          title="Issues Detected"
          value="7"
          subtitle="3 high priority"
          trend={{ value: -15, label: "vs last month" }}
          icon={AlertTriangle}
          variant="warning"
        />
        <MetricCard
          title="Aligned Processes"
          value="12"
          subtitle="50% of total"
          trend={{ value: 25, label: "improvement" }}
          icon={CheckCircle2}
          variant="success"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <HealthScoreChart 
            score={67} 
            aligned={12} 
            partial={8} 
            misaligned={4} 
          />
        </div>
        <div className="lg:col-span-2">
          <TrendChart />
        </div>
      </div>

      {/* Process Analysis & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ProcessBarChart />
        </div>
        <div className="lg:col-span-1">
          <InsightsPanel />
        </div>
      </div>

      {/* Activity & Export */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="lg:col-span-1">
          <ReportExport onExport={handleExport} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
