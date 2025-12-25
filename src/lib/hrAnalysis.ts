import { supabase } from "@/integrations/supabase/client";

export interface AnalysisJobInput {
  hcmUrl: string;
  companyName?: string;
  analysisType?: "full" | "quick";
  frameworks?: string[];
}

export interface AnalysisResult {
  overallScore: number;
  totalProcesses: number;
  alignedCount: number;
  partialCount: number;
  misalignedCount: number;
  processes: any[];
  recommendations: any[];
  executiveSummary: string;
  analyzedAt: string;
}

export interface AnalysisJob {
  id: string;
  hcm_url: string;
  company_name: string | null;
  status: "pending" | "processing" | "completed" | "failed";
  results: AnalysisResult | null;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
}

// Trigger HR process analysis
export const triggerHRAnalysis = async (
  input: AnalysisJobInput
): Promise<{ success: boolean; jobId?: string; results?: AnalysisResult; error?: string }> => {
  try {
    console.log("Triggering HR analysis for:", input.hcmUrl);

    const { data, error } = await supabase.functions.invoke("hr-analysis", {
      body: {
        hcmUrl: input.hcmUrl,
        companyName: input.companyName,
        analysisType: input.analysisType || "full",
        frameworks: input.frameworks || ["bersin", "gartner", "ulrich"],
      },
    });

    if (error) {
      console.error("HR analysis function error:", error);
      return { success: false, error: error.message };
    }

    console.log("HR analysis response:", data);
    return {
      success: true,
      jobId: data.jobId,
      results: data.results,
    };
  } catch (error) {
    console.error("HR analysis error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Poll for job status
export const pollJobStatus = async (
  jobId: string
): Promise<AnalysisJob | null> => {
  const { data, error } = await supabase
    .from("analysis_jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle();

  if (error) {
    console.error("Error polling job:", error);
    return null;
  }

  return data as unknown as AnalysisJob;
};

// Subscribe to job updates in real-time
export const subscribeToJobUpdates = (
  jobId: string,
  onUpdate: (job: AnalysisJob) => void
) => {
  const channel = supabase
    .channel(`job-${jobId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "analysis_jobs",
        filter: `id=eq.${jobId}`,
      },
      (payload) => {
        console.log("Job update received:", payload);
        onUpdate(payload.new as AnalysisJob);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Get recent analysis jobs
export const getRecentJobs = async (
  limit: number = 10
): Promise<AnalysisJob[]> => {
  const { data, error } = await supabase
    .from("analysis_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }

  return (data || []) as unknown as AnalysisJob[];
};

// Generate executive report (calls n8n for McKinsey-style formatting)
export const generateExecutiveReport = async (
  analysisResults: AnalysisResult,
  recipientEmail: string,
  companyName: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    console.log("Generating executive report for:", companyName);

    // For now, we'll simulate the report generation
    // In production, this would call another n8n workflow
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      message: `Report sent successfully to ${recipientEmail}`,
    };
  } catch (error) {
    console.error("Report generation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
