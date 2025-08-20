import { AnalysisCard } from "@/components/AnalysisCard";
import { ProgressBar } from "@/components/ProgressBar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Candidates",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-analysis-blue"
    },
    {
      title: "Resumes Analyzed",
      value: "892",
      change: "+8%", 
      icon: FileText,
      color: "text-analysis-green"
    },
    {
      title: "Average Score",
      value: "78.5",
      change: "+2.3",
      icon: TrendingUp,
      color: "text-analysis-purple"
    },
    {
      title: "Processing Time",
      value: "2.4s",
      change: "-0.8s",
      icon: Clock,
      color: "text-analysis-orange"
    }
  ];

  const recentAnalyses = [
    {
      candidate: "John Smith",
      role: "Frontend Developer",
      score: 85,
      status: "qualified",
      timestamp: "2 hours ago"
    },
    {
      candidate: "Sarah Johnson", 
      role: "Data Scientist",
      score: 92,
      status: "qualified",
      timestamp: "4 hours ago"
    },
    {
      candidate: "Mike Wilson",
      role: "Production Supervisor",
      score: 67,
      status: "needs-review",
      timestamp: "6 hours ago"
    },
    {
      candidate: "Emily Davis",
      role: "UI Designer",
      score: 45,
      status: "not-qualified",
      timestamp: "8 hours ago"
    }
  ];

  const skillGaps = [
    { skill: "Touchlink System", gap: 85 },
    { skill: "Leadership", gap: 72 },
    { skill: "Data Analysis", gap: 68 },
    { skill: "Project Management", gap: 55 },
    { skill: "Cloud Computing", gap: 43 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Overview of candidate screening performance and analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-analysis-green">
                    {stat.change} from last month
                  </p>
                </div>
                <Icon className={stat.color} size={24} />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Analyses */}
        <AnalysisCard title="📋 Recent Analyses" variant="blue">
          <div className="space-y-4">
            {recentAnalyses.map((analysis, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="font-semibold text-foreground">
                    {analysis.candidate}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {analysis.role}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {analysis.timestamp}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    {analysis.score}
                  </span>
                  {analysis.status === "qualified" && (
                    <CheckCircle className="text-analysis-green" size={20} />
                  )}
                  {analysis.status === "needs-review" && (
                    <AlertCircle className="text-analysis-orange" size={20} />
                  )}
                  {analysis.status === "not-qualified" && (
                    <XCircle className="text-analysis-red" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </AnalysisCard>

        {/* Skill Gap Analysis */}
        <AnalysisCard title="📊 Common Skill Gaps" variant="purple">
          <div className="space-y-4">
            {skillGaps.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-medium">{item.skill}</span>
                  <span className="text-muted-foreground text-sm">{item.gap}% missing</span>
                </div>
                <ProgressBar 
                  value={item.gap} 
                  variant="red"
                />
              </div>
            ))}
          </div>
        </AnalysisCard>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalysisCard title="🎯 Score Distribution" variant="green">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Excellent (90-100)</span>
              <Badge className="bg-analysis-green/20 text-analysis-green">12%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Good (80-89)</span>
              <Badge className="bg-analysis-blue/20 text-analysis-blue">28%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Average (70-79)</span>
              <Badge className="bg-analysis-orange/20 text-analysis-orange">35%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Poor (60-69)</span>
              <Badge className="bg-analysis-red/20 text-analysis-red">25%</Badge>
            </div>
          </div>
        </AnalysisCard>

        <AnalysisCard title="📈 Monthly Trends" variant="orange">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-analysis-orange">+15%</div>
              <div className="text-sm text-muted-foreground">Analysis requests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-analysis-green">+8%</div>
              <div className="text-sm text-muted-foreground">Average scores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-analysis-blue">-12%</div>
              <div className="text-sm text-muted-foreground">Processing time</div>
            </div>
          </div>
        </AnalysisCard>

        <AnalysisCard title="🏆 Top Categories" variant="yellow">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Software Development</span>
              <span className="font-bold">342</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Office</span>
              <span className="font-bold">298</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Production</span>
              <span className="font-bold">187</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Data Science</span>
              <span className="font-bold">134</span>
            </div>
          </div>
        </AnalysisCard>
      </div>
    </div>
  );
}