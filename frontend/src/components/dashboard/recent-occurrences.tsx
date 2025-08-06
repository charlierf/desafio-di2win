import { MetricCard } from "@/components/ui/metric-card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Plane } from "lucide-react";
import { Occurrence } from "@/hooks/useAviationData";

interface RecentOccurrencesProps {
  data: Occurrence[];
}

const getSeverityVariant = (severity: string) => {
  switch (severity) {
    case "Acidente":
      return "destructive";
    case "Incidente Grave":
      return "secondary";
    case "Incidente":
      return "outline";
    default:
      return "outline";
  }
};

export function RecentOccurrences({ data }: RecentOccurrencesProps) {
  return (
    <MetricCard title="Ocorrências Recentes">
      <div className="space-y-4">
        {data.slice(0, 5).map((occurrence, index) => (
          <div
            key={occurrence.codigo_ocorrencia || index}
            className="rounded-lg border border-border/50 p-4 transition-smooth hover:bg-muted/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant={getSeverityVariant(occurrence.ocorrencia_classificacao || '')}>
                  {occurrence.ocorrencia_classificacao || 'N/A'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {occurrence.codigo_ocorrencia}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {occurrence.ocorrencia_data_hora ? 
                  new Date(occurrence.ocorrencia_data_hora).toLocaleDateString('pt-BR') : 
                  'N/A'
                }
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{occurrence.ocorrencia_cidade || 'N/A'}, {occurrence.ocorrencia_uf || 'N/A'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Plane className="h-4 w-4 text-muted-foreground" />
                <span>{occurrence.aeronave_fabricante || 'N/A'} {occurrence.aeronave_modelo || ''}</span>
                {occurrence.aeronave_fase_operacao && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{occurrence.aeronave_fase_operacao}</span>
                  </>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                {occurrence.aeronave_fatalidades_total > 0 && (
                  <span className="text-destructive font-medium">
                    {occurrence.aeronave_fatalidades_total} fatalidade{occurrence.aeronave_fatalidades_total > 1 ? 's' : ''}
                  </span>
                )}
                {occurrence.aeronave_ocupantes_total > 0 && (
                  <span>
                    {occurrence.aeronave_fatalidades_total > 0 ? ' • ' : ''}
                    {occurrence.aeronave_ocupantes_total} ocupante{occurrence.aeronave_ocupantes_total > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MetricCard>
  );
}