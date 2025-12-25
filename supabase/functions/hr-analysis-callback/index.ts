import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-n8n-secret",
};

interface N8nCallbackPayload {
  job_id: string;
  success: boolean;
  results?: any;
  error?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify n8n secret if configured
    const n8nSecret = Deno.env.get("N8N_WEBHOOK_SECRET");
    const providedSecret = req.headers.get("x-n8n-secret");

    if (n8nSecret && providedSecret !== n8nSecret) {
      console.error("Invalid n8n secret");
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = await req.json() as N8nCallbackPayload;
    console.log("Received n8n callback for job:", payload.job_id);

    if (!payload.job_id) {
      return new Response(
        JSON.stringify({ success: false, error: "job_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (payload.success && payload.results) {
      // Update job with successful results
      const { error: updateError } = await supabase
        .from("analysis_jobs")
        .update({
          status: "completed",
          results: payload.results,
          completed_at: new Date().toISOString(),
        })
        .eq("id", payload.job_id);

      if (updateError) {
        console.error("Error updating job:", updateError);
        throw new Error("Failed to update job");
      }

      console.log("Job completed successfully:", payload.job_id);
    } else {
      // Update job with failure
      const { error: updateError } = await supabase
        .from("analysis_jobs")
        .update({
          status: "failed",
          error_message: payload.error || "Unknown error from n8n workflow",
        })
        .eq("id", payload.job_id);

      if (updateError) {
        console.error("Error updating job:", updateError);
        throw new Error("Failed to update job");
      }

      console.log("Job failed:", payload.job_id, payload.error);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Callback processed" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Callback processing error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
