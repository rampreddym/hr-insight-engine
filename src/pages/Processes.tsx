import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProcessCard } from "@/components/dashboard/ProcessCard";
import { mockAnalysisResults } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

const Processes = () => {
  return (
    <DashboardLayout
      title="Process Analysis"
      subtitle="Detailed breakdown of HR processes against industry frameworks"
      breadcrumbs={[{ label: "Process Analysis" }]}
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search processes..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="default">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="default">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Process Cards */}
      <div className="space-y-4">
        {mockAnalysisResults.processes.map((process) => (
          <ProcessCard key={process.id} process={process} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Processes;
