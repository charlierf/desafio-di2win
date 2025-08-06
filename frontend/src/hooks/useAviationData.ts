import { useState, useEffect, useCallback } from 'react';
import { apiService } from '@/services/api';

export interface OverviewStats {
  totalOccurrences: number;
  accidents: number;
  fatalities: number;
  monthlyGrowth: number;
}

export interface StateStats {
  state: string;
  accidents: number;
  serious_incidents: number;
  incidents: number;
  total: number;
  fatalities: number;
}

export interface AircraftTypeStats {
  name: string;
  count: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  accidents: number;
  serious_incidents: number;
  incidents: number;
  total: number;
}

export interface Occurrence {
  codigo_ocorrencia: string;
  ocorrencia_classificacao: string;
  ocorrencia_data_hora: string;
  ocorrencia_cidade: string;
  ocorrencia_uf: string;
  aeronave_modelo?: string;
  aeronave_fabricante?: string;
  aeronave_fatalidades_total?: number;
  aeronave_ocupantes_total?: number;
  aeronave_fase_operacao?: string;
}

export interface ContributingFactor {
  factor: string;
  count: number;
  percentage: number;
}

export function useAviationData(selectedYear?: string) {
  const [overviewStats, setOverviewStats] = useState<OverviewStats>({
    totalOccurrences: 0,
    accidents: 0,
    fatalities: 0,
    monthlyGrowth: 0
  });
  
  const [stateStats, setStateStats] = useState<StateStats[]>([]);
  const [aircraftTypes, setAircraftTypes] = useState<AircraftTypeStats[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<MonthlyTrend[]>([]);
  const [recentOccurrences, setRecentOccurrences] = useState<Occurrence[]>([]);
  const [contributingFactors, setContributingFactors] = useState<ContributingFactor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching data from API...', selectedYear ? `for year ${selectedYear}` : 'all data');
      
      const [overviewData, stateData, aircraftData, recentData, monthlyData, factorsData] = await Promise.all([
        apiService.getOverviewStats(selectedYear),
        apiService.getStateStats(selectedYear),
        apiService.getAircraftTypes(selectedYear),
        apiService.getRecentOccurrences(selectedYear),
        apiService.getMonthlyTrends(selectedYear),
        apiService.getContributingFactors(selectedYear)
      ]);

      console.log('Data fetched successfully:', { overviewData, stateData, aircraftData, recentData, monthlyData, factorsData });

      setOverviewStats(overviewData);
      setStateStats(stateData);
      setAircraftTypes(aircraftData);
      setRecentOccurrences(recentData);
      setMonthlyTrends(monthlyData);
      setContributingFactors(factorsData);

    } catch (err) {
      console.error('Error fetching aviation data:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      
      // Set fallback data in case of API error
      setOverviewStats({
        totalOccurrences: 5420,
        accidents: 1250,
        fatalities: 312,
        monthlyGrowth: -8
      });
      
      setStateStats([
        { state: 'SP', accidents: 245, serious_incidents: 132, incidents: 423, total: 800, fatalities: 167 },
        { state: 'RJ', accidents: 132, serious_incidents: 98, incidents: 289, total: 519, fatalities: 93 },
        { state: 'MG', accidents: 108, serious_incidents: 85, incidents: 276, total: 469, fatalities: 78 },
        { state: 'RS', accidents: 89, serious_incidents: 67, incidents: 198, total: 354, fatalities: 54 },
        { state: 'PR', accidents: 76, serious_incidents: 54, incidents: 189, total: 319, fatalities: 42 },
        { state: 'SC', accidents: 65, serious_incidents: 48, incidents: 156, total: 269, fatalities: 38 },
        { state: 'GO', accidents: 54, serious_incidents: 39, incidents: 134, total: 227, fatalities: 31 },
        { state: 'BA', accidents: 43, serious_incidents: 32, incidents: 112, total: 187, fatalities: 28 }
      ]);
      
      setAircraftTypes([
        { name: 'Avião', count: 2341, percentage: 43 },
        { name: 'Helicóptero', count: 1876, percentage: 35 },
        { name: 'Ultraleve', count: 654, percentage: 12 },
        { name: 'Planador', count: 298, percentage: 5 },
        { name: 'Balão', count: 156, percentage: 3 },
        { name: 'Paraquedas', count: 89, percentage: 2 }
      ]);
      
    } finally {
      setLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    overviewStats,
    stateStats,
    aircraftTypes,
    monthlyTrends,
    recentOccurrences,
    contributingFactors,
    loading,
    error,
    refetch: fetchAllData
  };
}