import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface AnalysisCardProps {
  title: string;
  children: ReactNode;
  variant?: "blue" | "green" | "purple" | "red" | "orange" | "yellow";
  className?: string;
}

const variantStyles = {
  blue: "border-analysis-blue/20 bg-gradient-to-r from-analysis-blue/10 to-analysis-blue/5",
  green: "border-analysis-green/20 bg-gradient-to-r from-analysis-green/10 to-analysis-green/5",
  purple: "border-analysis-purple/20 bg-gradient-to-r from-analysis-purple/10 to-analysis-purple/5",
  red: "border-analysis-red/20 bg-gradient-to-r from-analysis-red/10 to-analysis-red/5",
  orange: "border-analysis-orange/20 bg-gradient-to-r from-analysis-orange/10 to-analysis-orange/5",
  yellow: "border-analysis-yellow/20 bg-gradient-to-r from-analysis-yellow/10 to-analysis-yellow/5",
};

const titleStyles = {
  blue: "bg-analysis-blue text-white",
  green: "bg-analysis-green text-white",
  purple: "bg-analysis-purple text-white",
  red: "bg-analysis-red text-white",
  orange: "bg-analysis-orange text-white",
  yellow: "bg-analysis-yellow text-black",
};

export function AnalysisCard({ 
  title, 
  children, 
  variant = "blue", 
  className 
}: AnalysisCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden shadow-card transition-all duration-300 hover:shadow-analysis",
      variantStyles[variant],
      className
    )}>
      <div className={cn(
        "px-6 py-4 font-semibold text-sm",
        titleStyles[variant]
      )}>
        {title}
      </div>
      <div className="p-6">
        {children}
      </div>
    </Card>
  );
}