import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Mail, Calendar, MoreVertical } from "lucide-react";

const reports = [
  {
    id: 1,
    name: "Q4 2024 HR Process Analysis",
    type: "Full Analysis",
    date: "Dec 20, 2024",
    status: "completed",
    score: 67,
  },
  {
    id: 2,
    name: "Performance Management Deep Dive",
    type: "Framework Focus",
    date: "Dec 15, 2024",
    status: "completed",
    score: 45,
  },
  {
    id: 3,
    name: "L&D Alignment Report",
    type: "Quick Scan",
    date: "Dec 10, 2024",
    status: "completed",
    score: 88,
  },
  {
    id: 4,
    name: "Compensation Benchmark",
    type: "Framework Focus",
    date: "Dec 5, 2024",
    status: "completed",
    score: 65,
  },
];

const Reports = () => {
  return (
    <DashboardLayout
      title="Reports"
      subtitle="Generated reports and executive summaries"
      breadcrumbs={[{ label: "Reports" }]}
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search reports..."
          className="max-w-sm"
        />
        <div className="flex gap-2 sm:ml-auto">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="hero">
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/30">
                <th className="text-left p-4 font-medium text-sm">Report Name</th>
                <th className="text-left p-4 font-medium text-sm">Type</th>
                <th className="text-left p-4 font-medium text-sm">Date</th>
                <th className="text-left p-4 font-medium text-sm">Score</th>
                <th className="text-left p-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr 
                  key={report.id} 
                  className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{report.type}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{report.date}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-semibold ${
                      report.score >= 75 ? 'text-success' :
                      report.score >= 50 ? 'text-warning' : 'text-destructive'
                    }`}>
                      {report.score}%
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
