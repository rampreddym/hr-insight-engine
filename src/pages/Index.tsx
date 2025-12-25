import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { URLInputForm } from "@/components/dashboard/URLInputForm";
import { ExecutiveSummary } from "@/components/dashboard/ExecutiveSummary";
import { ProcessCard } from "@/components/dashboard/ProcessCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { ReportExport } from "@/components/dashboard/ReportExport";
import { mockAnalysisResults } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { BarChart3, BookOpen, Users, Zap, ArrowRight, Shield, Brain, Target } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleExport = async (email: string, company: string) => {
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Exporting report to:", email, "for company:", company);
  };

  if (!showDashboard) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background Effects */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-success/5 rounded-full blur-3xl" />

        <Header />

        <main className="relative pt-24">
          {/* Hero Section */}
          <section className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 fade-in">
                <Zap className="h-4 w-4" />
                Powered by n8n & Industry-Leading HR Frameworks
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 fade-in stagger-1">
                Transform Your{" "}
                <span className="gradient-text">HR Processes</span>{" "}
                with Intelligence
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 fade-in stagger-2">
                Connect your HCM system and instantly benchmark against Josh Bersin, Gartner, 
                and Dave Ulrich frameworks. Get actionable insights in a McKinsey-style report.
              </p>

              {/* Framework Badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-12 fade-in stagger-3">
                {[
                  { name: 'Josh Bersin Academy', color: 'bg-[hsl(186,72%,45%)/0.1] text-[hsl(186,72%,55%)] border-[hsl(186,72%,45%)/0.2]' },
                  { name: 'Gartner HR', color: 'bg-[hsl(160,84%,39%)/0.1] text-[hsl(160,84%,50%)] border-[hsl(160,84%,39%)/0.2]' },
                  { name: 'Dave Ulrich Model', color: 'bg-[hsl(280,65%,55%)/0.1] text-[hsl(280,65%,65%)] border-[hsl(280,65%,55%)/0.2]' },
                ].map((framework) => (
                  <span 
                    key={framework.name}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${framework.color}`}
                  >
                    {framework.name}
                  </span>
                ))}
              </div>
            </div>

            {/* URL Input Form */}
            <div className="max-w-2xl mx-auto fade-in stagger-4">
              <URLInputForm 
                onAnalysisStart={() => setIsAnalyzing(true)}
                onAnalysisComplete={() => setShowDashboard(true)}
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="container mx-auto px-6 py-20 border-t border-border/50">
            <h2 className="font-serif text-3xl font-semibold text-center mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Our AI-powered platform analyzes your HR processes against industry best practices
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: "Connect & Extract",
                  description: "Connect to Workday, SAP SuccessFactors, Oracle HCM, or ServiceNow to extract process logs automatically.",
                },
                {
                  icon: Brain,
                  title: "AI-Powered Analysis",
                  description: "n8n workflows apply Josh Bersin, Gartner, and Dave Ulrich frameworks to benchmark your processes.",
                },
                {
                  icon: Target,
                  title: "Actionable Insights",
                  description: "Receive a McKinsey-style report with prioritized recommendations sent directly to your CHRO and CIO.",
                },
              ].map((feature, index) => (
                <div key={feature.title} className="metric-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative z-10">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Frameworks Section */}
          <section className="container mx-auto px-6 py-20 border-t border-border/50">
            <h2 className="font-serif text-3xl font-semibold text-center mb-4">
              Built on Proven Frameworks
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              We analyze your HR processes against the world's most respected HR thought leadership
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-[hsl(186,72%,55%)]" />
                  <h3 className="font-serif text-lg font-semibold">Josh Bersin</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Industry analyst focusing on corporate HR, talent management, recruiting, leadership, 
                  technology, and the intersection of work and life.
                </p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-[hsl(160,84%,50%)]" />
                  <h3 className="font-serif text-lg font-semibold">Gartner HR</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Research-backed frameworks for HR transformation, covering talent acquisition, 
                  learning, performance, and organizational design.
                </p>
              </div>

              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-[hsl(280,65%,65%)]" />
                  <h3 className="font-serif text-lg font-semibold">Dave Ulrich</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The HR Value Proposition model defining strategic partner, administrative expert, 
                  employee champion, and change agent roles.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-6 py-20">
            <div className="glass-card p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
              <div className="relative z-10">
                <h2 className="font-serif text-3xl font-semibold mb-4">
                  Ready to Transform Your HR Operations?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                  Join forward-thinking organizations using data-driven insights to optimize their HR processes.
                </p>
                <Button variant="hero" size="xl">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold mb-2">
              HR Process Analysis Dashboard
            </h1>
            <p className="text-muted-foreground">
              Analysis completed • {mockAnalysisResults.totalProcesses} processes evaluated
            </p>
          </div>

          {/* Executive Summary */}
          <div className="mb-8">
            <ExecutiveSummary results={mockAnalysisResults} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Processes & Recommendations */}
            <div className="lg:col-span-2 space-y-8">
              {/* Process Cards */}
              <section>
                <h2 className="font-serif text-2xl font-semibold mb-4">
                  Process Analysis
                </h2>
                <div className="space-y-4">
                  {mockAnalysisResults.processes.map((process) => (
                    <ProcessCard key={process.id} process={process} />
                  ))}
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <h2 className="font-serif text-2xl font-semibold mb-4">
                  Top Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockAnalysisResults.topRecommendations.map((rec, index) => (
                    <RecommendationCard key={rec.id} recommendation={rec} index={index} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Export Report */}
              <ReportExport onExport={handleExport} />

              {/* Quick Stats */}
              <div className="glass-card p-6">
                <h3 className="font-serif text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Processes</span>
                    <span className="font-semibold">{mockAnalysisResults.totalProcesses}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Frameworks Applied</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Recommendations</span>
                    <span className="font-semibold">{mockAnalysisResults.topRecommendations.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Analysis Time</span>
                    <span className="font-semibold">6.2s</span>
                  </div>
                </div>
              </div>

              {/* New Analysis Button */}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowDashboard(false)}
              >
                Run New Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
