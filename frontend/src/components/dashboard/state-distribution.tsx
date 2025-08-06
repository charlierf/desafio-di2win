import { MetricCard } from "@/components/ui/metric-card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StateStats } from "@/hooks/useAviationData";

interface StateDistributionProps {
  data: StateStats[];
}

export function StateDistribution({ data }: StateDistributionProps) {
  // Pegar apenas os top 8 estados
  const topStates = data.slice(0, 8);

  return (
    <MetricCard title="Distribuição por Estados (Top 8)">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topStates}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="state" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--card-foreground))"
            }}
          />
          <Bar 
            dataKey="accidents" 
            stackId="a" 
            fill="hsl(var(--destructive))" 
            name="Acidentes"
          />
          <Bar 
            dataKey="serious_incidents" 
            stackId="a" 
            fill="hsl(var(--warning))" 
            name="Incidentes Graves"
          />
          <Bar 
            dataKey="incidents" 
            stackId="a" 
            fill="hsl(var(--primary))" 
            name="Incidentes"
          />
        </BarChart>
      </ResponsiveContainer>
    </MetricCard>
  );
}