import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewStats } from "@/components/dashboard/overview-stats";
import { MonthlyTrendChart } from "@/components/dashboard/monthly-trend-chart";
import { StateDistribution } from "@/components/dashboard/state-distribution";
import { AircraftTypesChart } from "@/components/dashboard/aircraft-types-chart";
import { ContributingFactors } from "@/components/dashboard/contributing-factors";
import { RecentOccurrences } from "@/components/dashboard/recent-occurrences";
import { useAviationData } from "@/hooks/useAviationData";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  
  const {
    overviewStats,
    stateStats,
    aircraftTypes,
    monthlyTrends,
    recentOccurrences,
    contributingFactors,
    loading,
    error
  } = useAviationData(selectedYear === "all" ? undefined : selectedYear);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Carregando dados das ocorrências...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">Erro ao carregar dados: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader 
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
        
        <OverviewStats 
          totalOccurrences={overviewStats.totalOccurrences}
          accidents={overviewStats.accidents}
          fatalities={overviewStats.fatalities}
          monthlyGrowth={overviewStats.monthlyGrowth}
        />
        
        <div className="grid gap-6 lg:grid-cols-2">
          <MonthlyTrendChart data={monthlyTrends} />
          <StateDistribution data={stateStats} />
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <AircraftTypesChart data={aircraftTypes} />
          <ContributingFactors data={contributingFactors} />
          <RecentOccurrences data={recentOccurrences} />
        </div>
      </div>
    </div>
  );
};

export default Index;
