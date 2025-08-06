import { PredictionForm } from "@/components/prediction/PredictionForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Prediction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Análise Preditiva CENIPA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Utilize inteligência artificial para prever a gravidade de ocorrências aeronáuticas 
            com base em características observadas no momento do evento.
          </p>
        </div>
        
        <PredictionForm />
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold text-lg mb-3">Sobre o Modelo</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Algoritmo XGBoost com 84% de acurácia</li>
                <li>• Treino com dados históricos do CENIPA</li>
                <li>• Recall de 92% para ocorrências graves</li>
                <li>• Minimiza falsos negativos para maior segurança</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 border">
              <h3 className="font-semibold text-lg mb-3">Classificações</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>Grave:</strong> Acidente ou Incidente Grave</li>
                <li>• <strong>Não Grave:</strong> Incidente</li>
                <li>• Previsão baseada em características iniciais</li>
                <li>• Ferramenta de apoio à análise de risco</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Ver Estatísticas Completas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
