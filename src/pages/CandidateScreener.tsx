import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AnalysisCard } from "@/components/AnalysisCard";
import { ProgressBar } from "@/components/ProgressBar";
import { JOB_ROLES } from "@/data/jobRoles";
import { Upload, Brain, FileText, TrendingUp, GraduationCap, Wrench, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  overall_score: number;
  professional_profile: {
    score: number;
    analysis: string;
    suggestions: string[];
  };
  skills_analysis: {
    current_skills: string[];
    missing_skills: string[];
    skill_proficiency: Record<string, number>;
  };
  experience_analysis: {
    score: number;
    analysis: string;
    improvements: string[];
  };
  education_analysis: {
    score: number;
    analysis: string;
  };
  key_strengths: string[];
  areas_for_improvement: string[];
}

export default function CandidateScreener() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [useCustomDescription, setUseCustomDescription] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const categories = Object.keys(JOB_ROLES);
  const roles = selectedCategory ? Object.keys(JOB_ROLES[selectedCategory]) : [];
  const selectedRoleData = selectedCategory && selectedRole ? JOB_ROLES[selectedCategory][selectedRole] : null;

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.name.endsWith('.pdf')) {
        setResumeFile(file);
        toast({
          title: "Resume uploaded",
          description: `${file.name} has been selected for analysis.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleAnalyze = async () => {
    if (!resumeFile || !selectedCategory || !selectedRole) {
      toast({
        title: "Missing information",
        description: "Please select a job category, role, and upload a resume.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call to Google Gemini
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result
      const mockResult: AnalysisResult = {
        overall_score: 85,
        professional_profile: {
          score: 80,
          analysis: "The resume presents a strong foundation for a recent graduate seeking a Design & Development IT role. The formatting is clean and easy to read, and the information is generally well-organized. However, some key areas require improvement to better showcase achievements and align more directly with the target role.",
          suggestions: [
            "Add a dedicated professional profile or summary statement",
            "Quantify achievements with specific metrics and results",
            "Highlight technical projects more prominently"
          ]
        },
        skills_analysis: {
          current_skills: ["Python", "Java", "JavaScript", "SQL", "Django", "React", "Git", "Docker"],
          missing_skills: ["Touchlink System", "System Integration", "Cloud Services"],
          skill_proficiency: {
            "Python": 85,
            "Java": 75,
            "JavaScript": 80,
            "SQL": 70,
            "Django": 75,
            "React": 85
          }
        },
        experience_analysis: {
          score: 75,
          analysis: "The experience section is organized chronologically but needs significant improvement in quantifying achievements. While the descriptions mention tasks performed, they rarely showcase the impact or results.",
          improvements: [
            "Add quantifiable metrics (15% increase in data accessibility, 10% reduction in report generation time)",
            "Use stronger action verbs to highlight impact",
            "Include leadership and collaboration examples"
          ]
        },
        education_analysis: {
          score: 90,
          analysis: "The education section is well-structured and clearly presents academic achievements, including GPA and honors. The relevant courses section is helpful in highlighting applicable skills."
        },
        key_strengths: [
          "Strong Technical Skills: Wide range of relevant programming languages, frameworks, and tools",
          "Chronological Experience: Easy to follow career progression", 
          "Relevant Coursework: Inclusion of relevant coursework directly supports claimed skills",
          "Multiple Experiences: Shows diverse experience from research to support to internship",
          "Active Involvement: Participation in Google Developer Student Club demonstrates proactive engagement"
        ],
        areas_for_improvement: [
          "Professional Profile: Add a compelling summary statement highlighting key skills and career aspirations",
          "Quantified Achievements: Include specific metrics and results for all experiences",
          "Touchlink System Knowledge: Gain familiarity with company-specific systems",
          "Portfolio Projects: Showcase personal or academic projects demonstrating technical abilities"
        ]
      };
      
      setAnalysisResult(mockResult);
      toast({
        title: "Analysis complete",
        description: "Resume analysis has been completed successfully.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Brain className="text-primary" size={32} />
          AI-Powered Resume Analysis
        </h1>
        <p className="text-muted-foreground text-lg">
          Get detailed insights from advanced AI models that analyze your resume and provide personalized recommendations.
        </p>
      </div>

      {/* Configuration Panel */}
      <Card className="p-6 shadow-card">
        <div className="space-y-6">
          <div className="text-lg font-semibold text-foreground mb-4">
            Upload your resume to get AI-powered analysis and recommendations.
          </div>

          {/* AI Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="ai-model">Select AI Model</Label>
            <Select defaultValue="google-gemini">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google-gemini">Google Gemini</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="job-category">Job Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>  
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specific-role">Specific Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole} disabled={!selectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Description */}
          {selectedRoleData && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="custom-description" 
                  checked={useCustomDescription}
                  onCheckedChange={(checked) => setUseCustomDescription(checked as boolean)}
                />
                <Label htmlFor="custom-description">Use custom job description</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="job-description">
                  {selectedRole} - Job Description
                </Label>
                <Textarea
                  id="job-description"
                  value={useCustomDescription ? jobDescription : selectedRoleData.description}
                  onChange={(e) => setJobDescription(e.target.value)}
                  readOnly={!useCustomDescription}
                  className={cn(
                    "min-h-[100px]",
                    !useCustomDescription && "bg-muted"
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedRoleData.required_skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="resume-upload">Upload Resume (PDF)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer space-y-2">
                <Upload className="mx-auto text-muted-foreground" size={48} />
                <div className="text-muted-foreground">
                  {resumeFile ? (
                    <span className="text-foreground font-medium">{resumeFile.name}</span>
                  ) : (
                    <>Click to upload or drag and drop your resume</>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Analyze Button */}
          <Button 
            onClick={handleAnalyze}
            disabled={!resumeFile || !selectedCategory || !selectedRole || isAnalyzing}
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
            size="lg"
          >
            {isAnalyzing ? (
              <>
                <Brain className="animate-spin mr-2" size={20} />
                Analyzing Resume...
              </>
            ) : (
              <>
                <Brain className="mr-2" size={20} />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">
          {/* Overall Assessment */}
          <AnalysisCard title="📊 Overall Assessment" variant="blue">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Resume Score</span>
                <span className="text-2xl font-bold text-analysis-blue">
                  {analysisResult.overall_score}/100
                </span>
              </div>
              <ProgressBar 
                value={analysisResult.overall_score} 
                variant="blue"
                className="mb-4"
              />
              <p className="text-muted-foreground leading-relaxed">
                {analysisResult.professional_profile.analysis}
              </p>
            </div>
          </AnalysisCard>

          {/* Professional Profile Analysis */}
          <AnalysisCard title="👤 Professional Profile Analysis" variant="green">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="text-analysis-green" size={20} />
                <span className="font-semibold">Profile Score: {analysisResult.professional_profile.score}/100</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {analysisResult.professional_profile.analysis}
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Suggestions:</h4>
                <ul className="space-y-1">
                  {analysisResult.professional_profile.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="text-analysis-green mt-0.5 flex-shrink-0" size={16} />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnalysisCard>

          {/* Skills Analysis */}
          <AnalysisCard title="⚡ Skills Analysis" variant="purple">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Current Skills:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {analysisResult.skills_analysis.current_skills.map((skill) => (
                    <Badge key={skill} className="bg-analysis-purple/20 text-analysis-purple border-analysis-purple/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Skill Proficiency:</h4>
                <div className="space-y-3">
                  {Object.entries(analysisResult.skills_analysis.skill_proficiency).map(([skill, level]) => (
                    <ProgressBar 
                      key={skill}
                      label={skill}
                      value={level}
                      variant="blue"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Missing Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.skills_analysis.missing_skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-analysis-red/50 text-analysis-red">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </AnalysisCard>

          {/* Experience Analysis */}
          <AnalysisCard title="💼 Experience Analysis" variant="red">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-analysis-red" size={20} />
                <span className="font-semibold">Experience Score: {analysisResult.experience_analysis.score}/100</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {analysisResult.experience_analysis.analysis}
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Example Improvements:</h4>
                <ul className="space-y-1">
                  {analysisResult.experience_analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="text-analysis-orange mt-0.5 flex-shrink-0" size={16} />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnalysisCard>

          {/* Education Analysis */}
          <AnalysisCard title="🎓 Education Analysis" variant="orange">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="text-analysis-orange" size={20} />
                <span className="font-semibold">Education Score: {analysisResult.education_analysis.score}/100</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {analysisResult.education_analysis.analysis}
              </p>
            </div>
          </AnalysisCard>

          {/* Key Strengths */}
          <AnalysisCard title="✅ Key Strengths" variant="green">
            <ul className="space-y-3">
              {analysisResult.key_strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-analysis-green mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-foreground">
                      {strength.split(':')[0]}:
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {strength.split(':')[1]?.trim()}
                    </div>  
                  </div>
                </li>
              ))}
            </ul>
          </AnalysisCard>

          {/* Areas for Improvement */}
          <AnalysisCard title="🔧 Areas for Improvement" variant="yellow">
            <ul className="space-y-3">
              {analysisResult.areas_for_improvement.map((area, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Wrench className="text-analysis-orange mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-foreground">
                      {area.split(':')[0]}:
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {area.split(':')[1]?.trim()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AnalysisCard>
        </div>
      )}
    </div>
  );
}