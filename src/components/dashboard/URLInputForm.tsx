import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Loader2, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { triggerHRAnalysis, subscribeToJobUpdates, AnalysisJob } from "@/lib/hrAnalysis";

interface URLInputFormProps {
  onAnalysisStart?: () => void;
  onAnalysisComplete?: () => void;
}

export const URLInputForm = ({ onAnalysisStart, onAnalysisComplete }: URLInputFormProps) => {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState<'input' | 'connecting' | 'extracting' | 'analyzing' | 'complete'>('input');
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const steps = [
    { id: 'connecting', label: 'Connecting to HCM System', icon: Link2 },
    { id: 'extracting', label: 'Extracting Process Logs', icon: Sparkles },
    { id: 'analyzing', label: 'Analyzing with n8n & HR Frameworks', icon: Sparkles },
  ];

  // Subscribe to job updates when we have a job ID
  useEffect(() => {
    if (!currentJobId) return;

    const unsubscribe = subscribeToJobUpdates(currentJobId, (job: AnalysisJob) => {
      if (job.status === 'completed') {
        setStep('complete');
        setIsAnalyzing(false);
        toast({
          title: "Analysis Complete",
          description: "Your HR process analysis is ready to view",
        });
        setTimeout(() => {
          onAnalysisComplete?.();
          navigate("/dashboard");
        }, 1000);
      } else if (job.status === 'failed') {
        setIsAnalyzing(false);
        setStep('input');
        toast({
          title: "Analysis Failed",
          description: job.error_message || "Please try again",
          variant: "destructive",
        });
      }
    });

    return unsubscribe;
  }, [currentJobId, navigate, onAnalysisComplete, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter your HCM/ERP system URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    onAnalysisStart?.();

    try {
      // Step 1: Connecting
      setStep('connecting');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Extracting
      setStep('extracting');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Analyzing with n8n
      setStep('analyzing');
      
      // Trigger the actual analysis
      const result = await triggerHRAnalysis({
        hcmUrl: url,
        analysisType: 'full',
        frameworks: ['bersin', 'gartner', 'ulrich'],
      });
      
      if (!result.success) {
        throw new Error(result.error || 'Analysis failed');
      }

      // If we got immediate results (mock mode), complete now
      if (result.results) {
        setStep('complete');
        setIsAnalyzing(false);
        toast({
          title: "Analysis Complete",
          description: "Your HR process analysis is ready to view",
        });
        setTimeout(() => {
          onAnalysisComplete?.();
          navigate("/dashboard");
        }, 1000);
      } else if (result.jobId) {
        // Otherwise, subscribe to updates
        setCurrentJobId(result.jobId);
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
      setStep('input');
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="glass-card p-8">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-semibold mb-2">
          Connect Your HCM System
        </h2>
        <p className="text-muted-foreground">
          Enter your Workday, SAP SuccessFactors, Oracle HCM, or ServiceNow URL to begin analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="url"
            placeholder="https://your-company.workday.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 h-14 text-base"
            disabled={isAnalyzing}
          />
        </div>

        {step !== 'input' && step !== 'complete' && (
          <div className="space-y-4 py-4">
            {steps.map((s, index) => {
              const isActive = s.id === step;
              const isComplete = index < currentStepIndex;
              
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-4 transition-all duration-300 ${
                    isActive ? 'opacity-100' : isComplete ? 'opacity-60' : 'opacity-30'
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground pulse-glow' 
                      : isComplete 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isComplete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {step === 'complete' && (
          <div className="flex items-center gap-3 py-4 text-success">
            <CheckCircle2 className="h-6 w-6" />
            <span className="font-medium">Analysis complete! Loading results...</span>
          </div>
        )}

        <Button
          type="submit"
          variant="hero"
          size="xl"
          className="w-full"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        {['Workday', 'SAP SuccessFactors', 'Oracle HCM', 'ServiceNow'].map((system) => (
          <span
            key={system}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
          >
            {system}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          Powered by n8n automation • Analyzes against Josh Bersin, Gartner & Dave Ulrich frameworks
        </p>
      </div>
    </div>
  );
};
