// Mock data para demonstração do dashboard
// Em produção, estes dados viriam da API do CENIPA

export interface Occurrence {
  id: string;
  date: string;
  state: string;
  city: string;
  type: string;
  severity: "Incidente" | "Acidente" | "Incidente Grave";
  aircraftType: string;
  operator: string;
  phase: string;
  fatalities: number;
  injuries: number;
  contributing_factors: string[];
}

export interface StateStats {
  state: string;
  total: number;
  accidents: number;
  incidents: number;
  serious_incidents: number;
  fatalities: number;
}

export interface AircraftTypeStats {
  type: string;
  count: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  year: number;
  accidents: number;
  incidents: number;
  serious_incidents: number;
  total: number;
}

export const mockOccurrences: Occurrence[] = [
  {
    id: "1",
    date: "2024-01-15",
    state: "SP",
    city: "São Paulo",
    type: "Pouso forçado",
    severity: "Acidente",
    aircraftType: "Cessna 172",
    operator: "Aeroclube",
    phase: "Pouso",
    fatalities: 0,
    injuries: 2,
    contributing_factors: ["Falha mecânica", "Condições meteorológicas"]
  },
  {
    id: "2", 
    date: "2024-02-03",
    state: "RJ",
    city: "Rio de Janeiro",
    type: "Incursão em pista",
    severity: "Incidente Grave",
    aircraftType: "Boeing 737",
    operator: "Companhia Aérea",
    phase: "Táxi",
    fatalities: 0,
    injuries: 0,
    contributing_factors: ["Erro humano", "Comunicação"]
  },
  {
    id: "3",
    date: "2024-02-10",
    state: "MG",
    city: "Belo Horizonte", 
    type: "Turbulência severa",
    severity: "Incidente",
    aircraftType: "Airbus A320",
    operator: "Companhia Aérea",
    phase: "Cruzeiro",
    fatalities: 0,
    injuries: 5,
    contributing_factors: ["Condições meteorológicas"]
  }
];

export const mockStateStats: StateStats[] = [
  { state: "SP", total: 145, accidents: 23, incidents: 98, serious_incidents: 24, fatalities: 12 },
  { state: "RJ", total: 89, accidents: 15, incidents: 62, serious_incidents: 12, fatalities: 8 },
  { state: "MG", total: 67, accidents: 11, incidents: 45, serious_incidents: 11, fatalities: 5 },
  { state: "RS", total: 54, accidents: 9, incidents: 36, serious_incidents: 9, fatalities: 4 },
  { state: "PR", total: 48, accidents: 8, incidents: 32, serious_incidents: 8, fatalities: 3 },
  { state: "SC", total: 42, accidents: 7, incidents: 28, serious_incidents: 7, fatalities: 2 },
  { state: "BA", total: 38, accidents: 6, incidents: 25, serious_incidents: 7, fatalities: 3 },
  { state: "GO", total: 35, accidents: 6, incidents: 23, serious_incidents: 6, fatalities: 2 }
];

export const mockAircraftTypes: AircraftTypeStats[] = [
  { type: "Cessna 172", count: 89, percentage: 18.2 },
  { type: "Boeing 737", count: 67, percentage: 13.7 },
  { type: "Piper PA-28", count: 54, percentage: 11.0 },
  { type: "Airbus A320", count: 43, percentage: 8.8 },
  { type: "Embraer EMB-110", count: 38, percentage: 7.8 },
  { type: "Cessna 152", count: 32, percentage: 6.5 },
  { type: "Robinson R44", count: 28, percentage: 5.7 },
  { type: "Outros", count: 138, percentage: 28.3 }
];

export const mockMonthlyTrends: MonthlyTrend[] = [
  { month: "Jan", year: 2024, accidents: 15, incidents: 45, serious_incidents: 8, total: 68 },
  { month: "Fev", year: 2024, accidents: 12, incidents: 52, serious_incidents: 9, total: 73 },
  { month: "Mar", year: 2024, accidents: 18, incidents: 48, serious_incidents: 11, total: 77 },
  { month: "Abr", year: 2024, accidents: 14, incidents: 41, serious_incidents: 7, total: 62 },
  { month: "Mai", year: 2024, accidents: 16, incidents: 39, serious_incidents: 10, total: 65 },
  { month: "Jun", year: 2024, accidents: 11, incidents: 35, serious_incidents: 6, total: 52 },
  { month: "Jul", year: 2024, accidents: 13, incidents: 42, serious_incidents: 8, total: 63 },
  { month: "Ago", year: 2024, accidents: 19, incidents: 44, serious_incidents: 12, total: 75 },
  { month: "Set", year: 2024, accidents: 17, incidents: 38, serious_incidents: 9, total: 64 },
  { month: "Out", year: 2024, accidents: 20, incidents: 46, serious_incidents: 13, total: 79 },
  { month: "Nov", year: 2024, accidents: 15, incidents: 40, serious_incidents: 8, total: 63 },
  { month: "Dez", year: 2024, accidents: 22, incidents: 49, serious_incidents: 14, total: 85 }
];

export const contributingFactors = [
  { factor: "Erro humano", count: 156, percentage: 32.1 },
  { factor: "Falha mecânica", count: 98, percentage: 20.2 },
  { factor: "Condições meteorológicas", count: 87, percentage: 17.9 },
  { factor: "Falha de motor", count: 45, percentage: 9.3 },
  { factor: "Problemas de comunicação", count: 32, percentage: 6.6 },
  { factor: "Falha de instrumentos", count: 28, percentage: 5.8 },
  { factor: "Outros", count: 40, percentage: 8.1 }
];

export const severityColors = {
  "Incidente": "hsl(var(--warning))",
  "Incidente Grave": "hsl(var(--destructive))", 
  "Acidente": "hsl(var(--destructive))"
};

export const phaseDistribution = [
  { phase: "Decolagem", count: 89, percentage: 18.3 },
  { phase: "Cruzeiro", count: 156, percentage: 32.1 },
  { phase: "Pouso", count: 134, percentage: 27.6 },
  { phase: "Táxi", count: 45, percentage: 9.3 },
  { phase: "Subida", count: 34, percentage: 7.0 },
  { phase: "Descida", count: 28, percentage: 5.7 }
];