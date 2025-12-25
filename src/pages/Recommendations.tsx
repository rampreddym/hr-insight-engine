import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { mockAnalysisResults } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown } from "lucide-react";

const Recommendations = () => {
  return (
    <DashboardLayout
      title="Recommendations"
      subtitle="Prioritized actions to improve HR process alignment"
      breadcrumbs={[{ label: "Recommendations" }]}
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          <Button variant="default" size="sm">All</Button>
          <Button variant="outline" size="sm">High Priority</Button>
          <Button variant="outline" size="sm">Medium</Button>
          <Button variant="outline" size="sm">Low</Button>
        </div>
        <div className="flex gap-2 sm:ml-auto">
          <Button variant="outline" size="default">
            <Filter className="h-4 w-4 mr-2" />
            Framework
          </Button>
          <Button variant="outline" size="default">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAnalysisResults.topRecommendations.map((rec, index) => (
          <RecommendationCard 
            key={rec.id} 
            recommendation={rec} 
            index={index} 
          />
        ))}
      </div>

      {/* Executive Summary */}
      <div className="mt-8 glass-card p-6">
        <h3 className="font-serif text-xl font-semibold mb-4">Executive Summary</h3>
        <p className="text-muted-foreground leading-relaxed">
          {mockAnalysisResults.executiveSummary}
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Recommendations;
