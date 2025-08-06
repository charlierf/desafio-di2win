import { MetricCard } from "@/components/ui/metric-card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AircraftTypeStats } from "@/hooks/useAviationData";

interface AircraftTypesChartProps {
  data: AircraftTypeStats[];
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--destructive))",
  "hsl(var(--warning))",
  "hsl(var(--success))",
  "hsl(var(--accent))",
  "hsl(var(--primary-glow))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--border))"
];

export function AircraftTypesChart({ data }: AircraftTypesChartProps) {
  return (
    <MetricCard title="Distribuição por Tipo de Aeronave">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} ${percentage}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--card-foreground))"
            }}
            formatter={(value: number, name: string) => [value, "Ocorrências"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </MetricCard>
  );
}