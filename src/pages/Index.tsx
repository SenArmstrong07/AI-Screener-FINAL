import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Users, BarChart3, ArrowRight, Sparkles, Target, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced Google Gemini AI analyzes resumes with precision and provides detailed insights.",
      color: "text-analysis-blue"
    },
    {
      icon: Target,
      title: "Role-Specific Screening",
      description: "Customized analysis based on specific job categories and role requirements.",
      color: "text-analysis-green"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get comprehensive analysis results in seconds, not hours.",
      color: "text-analysis-purple"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Sparkles size={24} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                AI-Powered Recruitment
              </span>
            </div>
            <h1 className="text-5xl font-bold text-foreground leading-tight">
              Smart Candidate
              <span className="bg-gradient-primary bg-clip-text text-transparent ml-3">
                Screening
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transform your hiring process with AI-powered resume analysis. 
              Get detailed insights, skill assessments, and personalized recommendations 
              powered by Google Gemini.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate("/screener")}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-3 text-lg"
            >
              <Users className="mr-2" size={20} />
              Start Screening
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg border-border hover:bg-accent"
            >
              <BarChart3 className="mr-2" size={20} />
              View Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground text-lg">
              Streamline your recruitment process with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 shadow-card hover:shadow-analysis transition-all duration-300 border-border/50">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-full bg-accent/20">
                        <Icon className={feature.color} size={32} />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-accent/20 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1,247</div>
              <div className="text-muted-foreground">Candidates Screened</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">89%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">2.4s</div>
              <div className="text-muted-foreground">Average Processing</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
