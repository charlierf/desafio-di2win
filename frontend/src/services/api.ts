import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('API_BASE_URL configured as:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interfaces
export interface PredictionInput {
  ocorrencia_uf: string;
  aeronave_tipo_veiculo: string;
  aeronave_motor_tipo: string;
  aeronave_registro_segmento: string;
  aeronave_fase_operacao: string;
}

export interface PredictionResponse {
  prediction: number;
  prediction_label: string;
  probability_grave: number;
  probability_nao_grave: number;
  confidence_level: string;
}

export interface FormOptions {
  ocorrencia_uf: string[];
  aeronave_tipo_veiculo: string[];
  aeronave_motor_tipo: string[];
  aeronave_registro_segmento: string[];
  aeronave_fase_operacao: string[];
}

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

export interface RecentOccurrence {
  codigo_ocorrencia: string;
  ocorrencia_classificacao: string;
  ocorrencia_data_hora: string;
  ocorrencia_cidade: string;
  ocorrencia_uf: string;
}

export interface MonthlyTrend {
  month: string;
  accidents: number;
  serious_incidents: number;
  incidents: number;
  total: number;
}

export interface ContributingFactor {
  factor: string;
  count: number;
  percentage: number;
}

// API calls
export const apiService = {
  // Health check
  async healthCheck(): Promise<{ status: string; model_loaded: boolean }> {
    const response = await api.get('/health');
    return response.data;
  },

  // Get form options
  async getFormOptions(): Promise<FormOptions> {
    const response = await api.get('/form-options');
    return response.data;
  },

  // Make prediction
  async predict(input: PredictionInput): Promise<PredictionResponse> {
    const response = await api.post('/predict', input);
    return response.data;
  },

  // Dashboard data
  async getOverviewStats(year?: string): Promise<OverviewStats> {
    console.log('Fetching overview stats...', year ? `for year ${year}` : '');
    const url = year ? `/stats/overview?year=${year}` : '/stats/overview';
    const response = await api.get(url);
    console.log('Overview stats response:', response.data);
    return response.data;
  },

  async getStateStats(year?: string): Promise<StateStats[]> {
    const url = year ? `/stats/by-state?year=${year}` : '/stats/by-state';
    const response = await api.get(url);
    return response.data;
  },

  async getAircraftTypes(year?: string): Promise<AircraftTypeStats[]> {
    const url = year ? `/stats/aircraft-types?year=${year}` : '/stats/aircraft-types';
    const response = await api.get(url);
    return response.data;
  },

  async getRecentOccurrences(year?: string): Promise<RecentOccurrence[]> {
    const url = year ? `/occurrences/recent?year=${year}` : '/occurrences/recent';
    const response = await api.get(url);
    return response.data;
  },

  async getMonthlyTrends(year?: string): Promise<MonthlyTrend[]> {
    const url = year ? `/stats/monthly-trends?year=${year}` : '/stats/monthly-trends';
    const response = await api.get(url);
    return response.data;
  },

  async getContributingFactors(year?: string): Promise<ContributingFactor[]> {
    const url = year ? `/stats/contributing-factors?year=${year}` : '/stats/contributing-factors';
    const response = await api.get(url);
    return response.data;
  },
};

export default api;
