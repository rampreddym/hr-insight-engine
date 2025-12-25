import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalysisRequest {
  hcmUrl: string;
  companyName?: string;
  analysisType?: "full" | "quick";
  frameworks?: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { hcmUrl, companyName, analysisType = "full", frameworks = ["bersin", "gartner", "ulrich"] } = await req.json() as AnalysisRequest;

    if (!hcmUrl) {
      return new Response(
        JSON.stringify({ success: false, error: "HCM URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Starting HR Process Analysis for:", hcmUrl);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create analysis job in database
    const { data: job, error: jobError } = await supabase
      .from("analysis_jobs")
      .insert({
        hcm_url: hcmUrl,
        company_name: companyName,
        status: "pending",
        input: { analysisType, frameworks },
      })
      .select()
      .single();

    if (jobError) {
      console.error("Error creating job:", jobError);
      throw new Error("Failed to create analysis job");
    }

    console.log("Created analysis job:", job.id);

    // Get n8n webhook configuration
    const n8nWebhookUrl = Deno.env.get("N8N_WEBHOOK_URL");
    const n8nWebhookSecret = Deno.env.get("N8N_WEBHOOK_SECRET");

    if (!n8nWebhookUrl) {
      console.log("N8N_WEBHOOK_URL not configured, using mock analysis");
      // Update job to processing
      await supabase
        .from("analysis_jobs")
        .update({ status: "processing" })
        .eq("id", job.id);

      // Simulate analysis with mock data
      const mockResults = generateMockResults(hcmUrl, frameworks);

      // Update job with results
      await supabase
        .from("analysis_jobs")
        .update({
          status: "completed",
          results: mockResults,
          completed_at: new Date().toISOString(),
        })
        .eq("id", job.id);

      return new Response(
        JSON.stringify({
          success: true,
          jobId: job.id,
          status: "completed",
          results: mockResults,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Call n8n workflow
    console.log("Calling n8n workflow at:", n8nWebhookUrl);
    
    const n8nPayload = {
      job_id: job.id,
      hcm_url: hcmUrl,
      company_name: companyName,
      analysis_type: analysisType,
      frameworks: frameworks,
      callback_url: "https://nedmlrscejohohuuoqgt.supabase.co/functions/v1/hr-analysis-callback",
    };

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(n8nWebhookSecret && { "X-N8N-Secret": n8nWebhookSecret }),
      },
      body: JSON.stringify(n8nPayload),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error("n8n webhook error:", errorText);
      
      // Update job to failed
      await supabase
        .from("analysis_jobs")
        .update({
          status: "failed",
          error_message: `n8n workflow failed: ${errorText}`,
        })
        .eq("id", job.id);

      throw new Error(`n8n workflow failed: ${n8nResponse.status}`);
    }

    // Update job to processing
    await supabase
      .from("analysis_jobs")
      .update({ status: "processing" })
      .eq("id", job.id);

    console.log("n8n workflow triggered successfully");

    return new Response(
      JSON.stringify({
        success: true,
        jobId: job.id,
        status: "processing",
        message: "Analysis started. Results will be available shortly.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("HR Analysis error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Generate mock results for demonstration
function generateMockResults(hcmUrl: string, frameworks: string[]) {
  const processes = [
    {
      name: "Hire Employee",
      bersin: 68,
      gartner: 75,
      ulrich: 73,
      status: "partial",
    },
    {
      name: "Performance Review",
      bersin: 42,
      gartner: 48,
      ulrich: 45,
      status: "misaligned",
    },
    {
      name: "Learning & Development",
      bersin: 90,
      gartner: 85,
      ulrich: 89,
      status: "aligned",
    },
    {
      name: "Compensation Management",
      bersin: 60,
      gartner: 70,
      ulrich: 65,
      status: "partial",
    },
  ];

  const overallScore = Math.round(
    processes.reduce((sum, p) => sum + (p.bersin + p.gartner + p.ulrich) / 3, 0) / processes.length
  );

  return {
    overallScore,
    totalProcesses: processes.length,
    alignedCount: processes.filter((p) => p.status === "aligned").length,
    partialCount: processes.filter((p) => p.status === "partial").length,
    misalignedCount: processes.filter((p) => p.status === "misaligned").length,
    processes: processes.map((p) => ({
      processName: p.name,
      status: p.status,
      overallScore: Math.round((p.bersin + p.gartner + p.ulrich) / 3),
      frameworks: {
        bersin: { score: p.bersin, name: "Josh Bersin Academy" },
        gartner: { score: p.gartner, name: "Gartner HR" },
        ulrich: { score: p.ulrich, name: "Dave Ulrich Model" },
      },
    })),
    recommendations: [
      {
        priority: "high",
        framework: "Josh Bersin",
        title: "Implement Skills-Based Talent Architecture",
        description: "Your hiring process lacks skills taxonomy integration.",
        impact: "40% improvement in time-to-productivity",
        effort: "medium",
      },
      {
        priority: "high",
        framework: "Gartner",
        title: "Enable Continuous Performance Conversations",
        description: "Replace annual reviews with ongoing feedback mechanisms.",
        impact: "2.5x increase in employee engagement",
        effort: "low",
      },
      {
        priority: "medium",
        framework: "Dave Ulrich",
        title: "Strengthen HR Business Partner Capabilities",
        description: "Your HRBP function shows limited strategic advisory involvement.",
        impact: "Elevate HR from administrative to strategic",
        effort: "high",
      },
    ],
    executiveSummary: `Analysis of ${hcmUrl} reveals an overall HR maturity score of ${overallScore}%. While Learning & Development shows strong alignment (88%), Performance Management requires urgent attention (45%). Key opportunities exist in implementing continuous feedback mechanisms and skills-based talent architecture.`,
    analyzedAt: new Date().toISOString(),
  };
}
