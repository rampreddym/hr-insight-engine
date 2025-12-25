export interface FrameworkScore {
  name: string;
  score: number;
  maxScore: number;
  status: 'aligned' | 'partial' | 'misaligned';
  description: string;
  recommendations: string[];
}

export interface ProcessAnalysis {
  id: string;
  processName: string;
  status: 'aligned' | 'partial' | 'misaligned';
  overallScore: number;
  frameworks: {
    bersin: FrameworkScore;
    gartner: FrameworkScore;
    ulrich: FrameworkScore;
  };
  logs: ProcessLog[];
  recommendations: Recommendation[];
}

export interface ProcessLog {
  id: string;
  timestamp: string;
  processType: string;
  action: string;
  status: string;
  details: string;
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  framework: string;
  title: string;
  description: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
}

export interface AnalysisJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  hcmUrl: string;
  createdAt: string;
  completedAt?: string;
  results?: AnalysisResults;
  error?: string;
}

export interface AnalysisResults {
  overallScore: number;
  totalProcesses: number;
  alignedCount: number;
  partialCount: number;
  misalignedCount: number;
  processes: ProcessAnalysis[];
  executiveSummary: string;
  topRecommendations: Recommendation[];
}

export interface ReportData {
  company: string;
  generatedAt: string;
  analysisResults: AnalysisResults;
  recipientEmail: string;
}
