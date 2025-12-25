-- Create table for storing HR analysis jobs
CREATE TABLE public.analysis_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  hcm_url TEXT NOT NULL,
  company_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  input JSONB DEFAULT '{}'::jsonb,
  results JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.analysis_jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for demo purposes)
-- In production, you'd want to restrict this to authenticated users
CREATE POLICY "Allow public read access to analysis jobs" 
ON public.analysis_jobs 
FOR SELECT 
USING (true);

-- Create policy for public insert access (for demo purposes)
CREATE POLICY "Allow public insert access to analysis jobs" 
ON public.analysis_jobs 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public update access (for demo purposes)
CREATE POLICY "Allow public update access to analysis jobs" 
ON public.analysis_jobs 
FOR UPDATE 
USING (true);

-- Create table for storing HR process results
CREATE TABLE public.hr_processes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  analysis_job_id UUID REFERENCES public.analysis_jobs(id) ON DELETE CASCADE,
  process_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'partial' CHECK (status IN ('aligned', 'partial', 'misaligned')),
  overall_score INTEGER NOT NULL DEFAULT 0,
  bersin_score INTEGER DEFAULT 0,
  gartner_score INTEGER DEFAULT 0,
  ulrich_score INTEGER DEFAULT 0,
  recommendations JSONB DEFAULT '[]'::jsonb,
  logs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hr_processes ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to hr_processes" 
ON public.hr_processes 
FOR SELECT 
USING (true);

-- Create policy for public insert access
CREATE POLICY "Allow public insert access to hr_processes" 
ON public.hr_processes 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_analysis_jobs_updated_at
BEFORE UPDATE ON public.analysis_jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for analysis_jobs
ALTER PUBLICATION supabase_realtime ADD TABLE public.analysis_jobs;