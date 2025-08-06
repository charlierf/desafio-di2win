import { MetricCard } from "@/components/ui/metric-card";
import { Progress } from "@/components/ui/progress";
import { ContributingFactor } from "@/hooks/useAviationData";

interface ContributingFactorsProps {
  data: ContributingFactor[];
}

export function ContributingFactors({ data }: ContributingFactorsProps) {
  return (
    <MetricCard title="Principais Fatores Contribuintes">
      <div className="space-y-4">
        {data.map((factor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-card-foreground">{factor.factor}</span>
              <span className="text-muted-foreground">
                {factor.count} ({factor.percentage}%)
              </span>
            </div>
            <Progress 
              value={factor.percentage} 
              className="h-2"
            />
          </div>
        ))}
      </div>
    </MetricCard>
  );
}