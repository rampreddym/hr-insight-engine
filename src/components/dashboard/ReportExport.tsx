import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileDown, Loader2, Mail, Building, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateExecutiveReport } from "@/lib/n8n";

interface ReportExportProps {
  onExport: (email: string, company: string) => Promise<void>;
}

export const ReportExport = ({ onExport }: ReportExportProps) => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!email.trim() || !company.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and company name",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    try {
      // Call the n8n workflow to generate the report
      const result = await generateExecutiveReport({}, email, company);
      
      // Also call the parent handler
      await onExport(email, company);
      
      if (result.success) {
        setExportComplete(true);
        toast({
          title: "Report Sent Successfully",
          description: `McKinsey-style report has been sent to ${email}`,
        });
        
        // Reset after 3 seconds
        setTimeout(() => {
          setExportComplete(false);
          setEmail("");
          setCompany("");
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="glass-card p-6 fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent/10">
          <FileDown className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold">Export Executive Report</h3>
          <p className="text-sm text-muted-foreground">
            McKinsey-style consulting format
          </p>
        </div>
      </div>

      {exportComplete ? (
        <div className="py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h4 className="font-semibold text-lg mb-2">Report Sent!</h4>
          <p className="text-sm text-muted-foreground">
            Check your inbox for the executive summary
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="CHRO/CIO Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="accent" 
            className="w-full" 
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Generate & Send Report
              </>
            )}
          </Button>
        </div>
      )}

      <div className="mt-4 p-3 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
        <p className="font-medium text-foreground/80 mb-2">Report includes:</p>
        <ul className="space-y-1 ml-4 list-disc">
          <li>Executive summary with key findings</li>
          <li>Framework alignment analysis</li>
          <li>Prioritized recommendations</li>
          <li>Implementation roadmap</li>
        </ul>
      </div>
    </div>
  );
};
