import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { apiService, PredictionInput, PredictionResponse, FormOptions } from '@/services/api';
import { AlertTriangle, CheckCircle, Loader2, Plane } from 'lucide-react';

export const PredictionForm: React.FC = () => {
  const [formOptions, setFormOptions] = useState<FormOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  
  const [formData, setFormData] = useState<PredictionInput>({
    ocorrencia_uf: '',
    aeronave_tipo_veiculo: '',
    aeronave_motor_tipo: '',
    aeronave_registro_segmento: '',
    aeronave_fase_operacao: ''
  });

  useEffect(() => {
    loadFormOptions();
  }, []);

  const loadFormOptions = async () => {
    try {
      setLoadingOptions(true);
      const options = await apiService.getFormOptions();
      setFormOptions(options);
    } catch (err) {
      console.error('Error loading form options:', err);
      setError('Erro ao carregar opções do formulário');
      // Set default options if API fails
      setFormOptions({
        ocorrencia_uf: ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'GO', 'BA', 'DF'],
        aeronave_tipo_veiculo: ['AVIÃO', 'HELICÓPTERO', 'ULTRALEVE', 'PLANADOR', 'BALÃO'],
        aeronave_motor_tipo: ['PISTÃO', 'TURBINA', 'TURBOPROP', 'ELÉTRICO'],
        aeronave_registro_segmento: ['AVIAÇÃO GERAL', 'REGULAR', 'INSTRUÇÃO', 'TÁXI AÉREO'],
        aeronave_fase_operacao: ['DECOLAGEM', 'POUSO', 'VOO DE CRUZEIRO', 'ESTACIONAMENTO', 'TAXIAMENTO']
      });
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleInputChange = (field: keyof PredictionInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear previous prediction when form changes
    if (prediction) {
      setPrediction(null);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handlePredict = async () => {
    if (!isFormValid()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiService.predict(formData);
      setPrediction(result);
    } catch (err) {
      console.error('Error making prediction:', err);
      setError('Erro ao fazer previsão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      ocorrencia_uf: '',
      aeronave_tipo_veiculo: '',
      aeronave_motor_tipo: '',
      aeronave_registro_segmento: '',
      aeronave_fase_operacao: ''
    });
    setPrediction(null);
    setError(null);
  };

  if (loadingOptions) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            Previsão de Gravidade de Ocorrências
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Carregando opções...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-6 w-6" />
          Previsão de Gravidade de Ocorrências
        </CardTitle>
        <CardDescription>
          Utilize Machine Learning para prever se uma ocorrência aeronáutica pode ser classificada como grave
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="uf">Estado da Ocorrência (UF)</Label>
            <Select
              value={formData.ocorrencia_uf}
              onValueChange={(value) => handleInputChange('ocorrencia_uf', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                {formOptions?.ocorrencia_uf.map(uf => (
                  <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tipo-veiculo">Tipo de Veículo</Label>
            <Select
              value={formData.aeronave_tipo_veiculo}
              onValueChange={(value) => handleInputChange('aeronave_tipo_veiculo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de veículo" />
              </SelectTrigger>
              <SelectContent>
                {formOptions?.aeronave_tipo_veiculo.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="motor-tipo">Tipo de Motor</Label>
            <Select
              value={formData.aeronave_motor_tipo}
              onValueChange={(value) => handleInputChange('aeronave_motor_tipo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de motor" />
              </SelectTrigger>
              <SelectContent>
                {formOptions?.aeronave_motor_tipo.map(motor => (
                  <SelectItem key={motor} value={motor}>{motor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="segmento">Segmento de Aviação</Label>
            <Select
              value={formData.aeronave_registro_segmento}
              onValueChange={(value) => handleInputChange('aeronave_registro_segmento', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o segmento" />
              </SelectTrigger>
              <SelectContent>
                {formOptions?.aeronave_registro_segmento.map(segmento => (
                  <SelectItem key={segmento} value={segmento}>{segmento}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fase-operacao">Fase da Operação</Label>
            <Select
              value={formData.aeronave_fase_operacao}
              onValueChange={(value) => handleInputChange('aeronave_fase_operacao', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a fase da operação" />
              </SelectTrigger>
              <SelectContent>
                {formOptions?.aeronave_fase_operacao.map(fase => (
                  <SelectItem key={fase} value={fase}>{fase}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handlePredict}
            disabled={!isFormValid() || loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              'Fazer Previsão'
            )}
          </Button>
          
          <Button variant="outline" onClick={handleReset}>
            Limpar
          </Button>
        </div>

        {prediction && (
          <Card className={`mt-6 ${prediction.prediction === 1 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {prediction.prediction === 1 ? (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
                Resultado da Previsão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Classificação:</span>
                  <Badge 
                    variant={prediction.prediction === 1 ? "destructive" : "secondary"}
                    className="text-sm"
                  >
                    {prediction.prediction_label}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Prob. Grave:</span>
                    <div className="text-lg font-semibold text-red-600">
                      {(prediction.probability_grave * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Prob. Não Grave:</span>
                    <div className="text-lg font-semibold text-green-600">
                      {(prediction.probability_nao_grave * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Confiança:</span>
                  <Badge variant="outline">
                    {prediction.confidence_level}
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground mt-4 p-3 bg-background rounded-md">
                  {prediction.prediction === 1 ? (
                    <p>⚠️ <strong>Alto risco:</strong> As características indicam maior probabilidade de ser uma ocorrência grave (Acidente ou Incidente Grave). Recomenda-se atenção especial.</p>
                  ) : (
                    <p>✅ <strong>Baixo risco:</strong> As características indicam menor probabilidade de ser uma ocorrência grave (provavelmente um Incidente).</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
