import { Plane, Calendar, Filter, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

export function DashboardHeader({ selectedYear, onYearChange }: DashboardHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
          <Plane className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Dashboard CENIPA
          </h1>
          <p className="text-sm text-muted-foreground">
            Análise de Ocorrências Aeronáuticas
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          onClick={() => navigate('/prediction')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Brain className="h-4 w-4 mr-2" />
          Análise Preditiva
        </Button>
        
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger className="w-32">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>
    </div>
  );
}