import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  variant?: "blue" | "green" | "orange" | "red";
  className?: string;
}

const variantStyles = {
  blue: "bg-analysis-blue",
  green: "bg-analysis-green",
  orange: "bg-analysis-orange",  
  red: "bg-analysis-red",
};

export function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  variant = "blue",
  className 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-foreground">{label}</span>
          <span className="text-muted-foreground">{value}/{max}</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}