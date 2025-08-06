import { StatsCard } from "@/components/ui/stats-card";
import { Plane, AlertTriangle, Users, TrendingUp } from "lucide-react";

interface OverviewStatsProps {
  totalOccurrences: number;
  accidents: number;
  fatalities: number;
  monthlyGrowth: number;
}

export function OverviewStats({ 
  totalOccurrences, 
  accidents, 
  fatalities, 
  monthlyGrowth 
}: OverviewStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total de Ocorrências"
        value={totalOccurrences.toLocaleString()}
        description="Últimos 12 meses"
        icon={Plane}
        variant="default"
      />
      
      <StatsCard
        title="Acidentes"
        value={accidents}
        description="Ocorrências graves"
        icon={AlertTriangle}
        variant="danger"
      />
      
      <StatsCard
        title="Fatalidades"
        value={fatalities}
        description="Vítimas fatais"
        icon={Users}
        variant="danger"
      />
      
      <StatsCard
        title="Tendência Mensal"
        value={`${monthlyGrowth > 0 ? '+' : ''}${monthlyGrowth}%`}
        description="Comparado ao mês anterior"
        icon={TrendingUp}
        variant={monthlyGrowth > 0 ? "warning" : "success"}
        trend={{
          value: Math.abs(monthlyGrowth),
          direction: monthlyGrowth > 0 ? "up" : "down"
        }}
      />
    </div>
  );
}