import { MetricCard } from "@/components/ui/metric-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MonthlyTrend } from "@/hooks/useAviationData";

interface MonthlyTrendChartProps {
  data: MonthlyTrend[];
}

export function MonthlyTrendChart({ data }: MonthlyTrendChartProps) {
  return (
    <MetricCard title="Tendência Mensal de Ocorrências">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
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
          <Legend />
          <Line 
            type="monotone" 
            dataKey="accidents" 
            stroke="hsl(var(--destructive))" 
            strokeWidth={2}
            name="Acidentes"
            dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="serious_incidents" 
            stroke="hsl(var(--warning))" 
            strokeWidth={2}
            name="Incidentes Graves"
            dot={{ fill: "hsl(var(--warning))", strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="incidents" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            name="Incidentes"
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </MetricCard>
  );
}