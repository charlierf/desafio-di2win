from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import uvicorn
from typing import Dict, Any
import os
from supabase import create_client, Client

app = FastAPI(
    title="CENIPA Aviation Safety API",
    description="API para análise de ocorrências aeronáuticas baseada em dados CENIPA",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:3000", 
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração Supabase
url = os.getenv("SUPABASE_URL", "https://lkfzudxjngrdcfcqftzr.supabase.co")
key = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrZnp1ZHhqbmdyZGNmY3FmdHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MDEzNTUsImV4cCI6MjA1MDE3NzM1NX0.HS4T9mWBAFKMWK7yfgCx0fvPL6hqcr_IYjSz9FO5OOI")
supabase: Client = create_client(url, key)

# Carregar modelo e colunas
model_components = None
model = None
model_columns = None
opcoes_form = None

try:
    model_components = joblib.load('modelo_cenipa_final.joblib')
    model = model_components['model']
    model_columns = model_components['model_columns']
    print("✅ Modelo carregado com sucesso!")
    print(f"📊 Colunas do modelo: {len(model_columns)}")
except Exception as e:
    print(f"❌ Erro ao carregar modelo: {e}")

try:
    opcoes_form = joblib.load('opcoes_formulario.joblib')
    print("✅ Opções do formulário carregadas!")
except Exception as e:
    print(f"❌ Erro ao carregar opções: {e}")

# Modelos Pydantic
class PredictionInput(BaseModel):
    ocorrencia_uf: str
    aeronave_tipo_veiculo: str
    aeronave_motor_tipo: str
    aeronave_registro_segmento: str
    aeronave_fase_operacao: str

class PredictionResponse(BaseModel):
    prediction: int
    prediction_label: str
    probability_grave: float
    probability_nao_grave: float
    confidence_level: str

# Endpoints
@app.get("/")
async def root():
    return {"message": "CENIPA Aviation Safety API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.get("/form-options")
async def get_form_options():
    """Retorna as opções disponíveis para cada campo do formulário"""
    if opcoes_form is None:
        raise HTTPException(status_code=500, detail="Opções do formulário não carregadas")
    
    return opcoes_form

@app.post("/predict", response_model=PredictionResponse)
async def predict_severity(input_data: PredictionInput):
    """Faz previsão de gravidade da ocorrência aeronáutica"""
    if model is None or model_columns is None:
        raise HTTPException(status_code=500, detail="Modelo não carregado")
    
    try:
        print(f"🔍 INPUT RECEBIDO: {input_data}")
        
        # Converter input para DataFrame
        input_dict = {
            'ocorrencia_uf': [input_data.ocorrencia_uf],
            'aeronave_tipo_veiculo': [input_data.aeronave_tipo_veiculo],
            'aeronave_motor_tipo': [input_data.aeronave_motor_tipo],
            'aeronave_registro_segmento': [input_data.aeronave_registro_segmento],
            'aeronave_fase_operacao': [input_data.aeronave_fase_operacao]
        }
        input_df = pd.DataFrame(input_dict)
        print(f"📊 DATAFRAME ORIGINAL: {input_df.to_dict()}")
        
        # Aplicar One-Hot Encoding (sem drop_first para manter compatibilidade com o modelo)
        input_encoded = pd.get_dummies(input_df, drop_first=False, dtype=int)
        print(f"🔄 APÓS ONE-HOT: Colunas={list(input_encoded.columns)}, Shape={input_encoded.shape}")
        
        # Alinhar colunas com o modelo
        input_aligned = input_encoded.reindex(columns=model_columns, fill_value=0)
        print(f"🎯 ALINHADO COM MODELO: Shape={input_aligned.shape}, Sum={input_aligned.sum().sum()}")
        
        # Fazer previsão
        prediction = model.predict(input_aligned)[0]
        probabilities = model.predict_proba(input_aligned)[0]
        print(f"📈 PREDIÇÃO: {prediction}, PROB: {probabilities}")
        
        
        # Determinar nível de confiança
        max_prob = max(probabilities)
        if max_prob >= 0.8:
            confidence = "Alto"
        elif max_prob >= 0.6:
            confidence = "Médio"
        else:
            confidence = "Baixo"
        
        return PredictionResponse(
            prediction=int(prediction),
            prediction_label="Grave" if prediction == 1 else "Não Grave",
            probability_grave=float(probabilities[1]),
            probability_nao_grave=float(probabilities[0]),
            confidence_level=confidence
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na previsão: {str(e)}")

# Endpoints para dados do dashboard
@app.get("/stats/overview")
async def get_overview_stats(year: str = None):
    """Retorna estatísticas gerais das ocorrências"""
    try:
        # Construir query com filtro de ano se fornecido
        query = supabase.table('ocorrencias').select('*')
        if year and year != "all":
            # Assumindo que temos um campo de data na tabela
            query = query.gte('ocorrencia_data_hora', f'{year}-01-01').lte('ocorrencia_data_hora', f'{year}-12-31')
        
        response = query.execute()
        
        if not response.data:
            # Retornar dados mock se não houver dados no Supabase
            return {
                "totalOccurrences": 5420,
                "accidents": 1250,
                "fatalities": 312,
                "monthlyGrowth": -8
            }
        
        # Processar dados reais
        total_occurrences = len(response.data)
        accidents = len([item for item in response.data if item.get('ocorrencia_classificacao') == 'ACIDENTE'])
        fatalities = 0  # Simplificado por ora, pois não temos esses dados facilmente disponíveis
        monthly_growth = -2  # Simplificado por ora
        
        return {
            "totalOccurrences": total_occurrences,
            "accidents": accidents,
            "fatalities": fatalities,
            "monthlyGrowth": monthly_growth
        }
        
    except Exception as e:
        # Retornar dados mock em caso de erro
        return {
            "totalOccurrences": 5420,
            "accidents": 1250,
            "fatalities": 312,
            "monthlyGrowth": -8
        }

@app.get("/stats/by-state")
async def get_state_stats(year: str = None):
    """Retorna estatísticas por estado"""
    try:
        query = supabase.table('ocorrencias').select('ocorrencia_uf, ocorrencia_classificacao')
        if year and year != "all":
            query = query.gte('ocorrencia_data_hora', f'{year}-01-01').lte('ocorrencia_data_hora', f'{year}-12-31')
        
        response = query.execute()
        
        if not response.data:
            # Retornar dados mock
            return [
                {"state": "SP", "accidents": 245, "serious_incidents": 132, "incidents": 423, "total": 800, "fatalities": 167},
                {"state": "RJ", "accidents": 132, "serious_incidents": 98, "incidents": 289, "total": 519, "fatalities": 93},
                {"state": "MG", "accidents": 108, "serious_incidents": 85, "incidents": 276, "total": 469, "fatalities": 78},
            ]
        
        # Processar dados reais
        state_data = {}
        for item in response.data:
            state = item.get('ocorrencia_uf', 'N/A')
            classification = item.get('ocorrencia_classificacao', 'INCIDENTE')
            
            if state not in state_data:
                state_data[state] = {"accidents": 0, "serious_incidents": 0, "incidents": 0, "total": 0}
            
            state_data[state]["total"] += 1
            if classification == 'ACIDENTE':
                state_data[state]["accidents"] += 1
            elif classification == 'INCIDENTE GRAVE':
                state_data[state]["serious_incidents"] += 1
            else:
                state_data[state]["incidents"] += 1
        
        result = []
        for state, data in state_data.items():
            result.append({
                "state": state,
                "accidents": data["accidents"],
                "serious_incidents": data["serious_incidents"],
                "incidents": data["incidents"],
                "total": data["total"],
                "fatalities": 0  # Simplificado por ora
            })
        
        return sorted(result, key=lambda x: x["total"], reverse=True)[:10]
        
    except Exception as e:
        # Retornar dados mock em caso de erro
        return [
            {"state": "SP", "accidents": 245, "serious_incidents": 132, "incidents": 423, "total": 800, "fatalities": 167},
            {"state": "RJ", "accidents": 132, "serious_incidents": 98, "incidents": 289, "total": 519, "fatalities": 93},
        ]

@app.get("/stats/aircraft-types")
async def get_aircraft_types(year: str = None):
    """Retorna estatísticas por tipo de aeronave"""
    try:
        # Tentar primeiro a tabela aeronaves
        query = supabase.table('aeronaves').select('aeronave_tipo_veiculo')
        if year and year != "all":
            query = query.gte('created_at', f'{year}-01-01').lte('created_at', f'{year}-12-31')
        
        response = query.execute()
        
        # Se a tabela aeronaves não tem dados ou tem dados null, tentar ocorrencias
        if not response.data or all(item.get('aeronave_tipo_veiculo') is None for item in response.data):
            print("🔄 Tabela aeronaves sem dados válidos, tentando tabela ocorrencias...")
            query = supabase.table('ocorrencias').select('aeronave_tipo_veiculo')
            if year and year != "all":
                query = query.gte('ocorrencia_data_hora', f'{year}-01-01').lte('ocorrencia_data_hora', f'{year}-12-31')
            response = query.execute()
        
        if not response.data:
            # Retornar dados mock
            return [
                {"name": "Avião", "count": 2341, "percentage": 43},
                {"name": "Helicóptero", "count": 1876, "percentage": 35},
                {"name": "Ultraleve", "count": 654, "percentage": 12},
            ]
        
        # Processar dados reais
        type_counts = {}
        for item in response.data:
            aircraft_type = item.get('aeronave_tipo_veiculo')
            if aircraft_type and aircraft_type != 'None':  # Filtrar valores null e 'None'
                type_counts[aircraft_type] = type_counts.get(aircraft_type, 0) + 1
        
        # Se não temos tipos válidos, usar dados mock
        if not type_counts:
            return [
                {"name": "Avião", "count": 2341, "percentage": 43},
                {"name": "Helicóptero", "count": 1876, "percentage": 35},
                {"name": "Ultraleve", "count": 654, "percentage": 12},
            ]
        
        total = sum(type_counts.values())
        result = []
        for aircraft_type, count in type_counts.items():
            percentage = round((count / total) * 100) if total > 0 else 0
            result.append({
                "name": aircraft_type,
                "count": count,
                "percentage": percentage
            })
        
        return sorted(result, key=lambda x: x["count"], reverse=True)[:6]
        
    except Exception as e:
        # Retornar dados mock em caso de erro
        return [
            {"name": "Avião", "count": 2341, "percentage": 43},
            {"name": "Helicóptero", "count": 1876, "percentage": 35},
        ]

@app.get("/occurrences/recent")
async def get_recent_occurrences(year: str = None):
    """Retorna as ocorrências mais recentes"""
    try:
        query = supabase.table('ocorrencias') \
            .select('codigo_ocorrencia, ocorrencia_classificacao, ocorrencia_data_hora, ocorrencia_cidade, ocorrencia_uf') \
            .order('ocorrencia_data_hora', desc=True) \
            .limit(10)
        
        if year and year != "all":
            query = query.gte('ocorrencia_data_hora', f'{year}-01-01').lte('ocorrencia_data_hora', f'{year}-12-31')
        
        response = query.execute()
        
        if not response.data:
            # Retornar dados mock
            return [
                {
                    "codigo_ocorrencia": "2024-000123",
                    "ocorrencia_classificacao": "Acidente",
                    "ocorrencia_data_hora": "2024-12-15T14:30:00Z",
                    "ocorrencia_cidade": "São Paulo",
                    "ocorrencia_uf": "SP"
                }
            ]
        
        return response.data
        
    except Exception as e:
        # Retornar dados mock em caso de erro
        return [
            {
                "codigo_ocorrencia": "2024-000123",
                "ocorrencia_classificacao": "Acidente",
                "ocorrencia_data_hora": "2024-12-15T14:30:00Z",
                "ocorrencia_cidade": "São Paulo",
                "ocorrencia_uf": "SP"
            }
        ]

@app.get("/stats/monthly-trends")
async def get_monthly_trends(year: str = None):
    """Retorna tendências mensais das ocorrências"""
    try:
        query = supabase.table('ocorrencias').select('ocorrencia_data_hora, ocorrencia_classificacao')
        if year and year != "all":
            query = query.gte('ocorrencia_data_hora', f'{year}-01-01').lte('ocorrencia_data_hora', f'{year}-12-31')
        
        response = query.execute()
        
        if not response.data:
            # Retornar dados mock se não houver dados
            return [
                { "month": "Jan/24", "accidents": 12, "serious_incidents": 8, "incidents": 25, "total": 45 },
                { "month": "Fev/24", "accidents": 15, "serious_incidents": 12, "incidents": 28, "total": 55 },
            ]
        
        # Processar dados reais por mês
        from datetime import datetime
        monthly_data = {}
        
        for item in response.data:
            date_str = item.get('ocorrencia_data_hora')
            classification = item.get('ocorrencia_classificacao', 'INCIDENTE')
            
            if date_str:
                try:
                    # Tentar diferentes formatos de data
                    if 'T' in date_str:
                        date_obj = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                    else:
                        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
                    
                    month_key = f"{date_obj.strftime('%b')}/{date_obj.strftime('%y')}"
                    
                    if month_key not in monthly_data:
                        monthly_data[month_key] = {"accidents": 0, "serious_incidents": 0, "incidents": 0, "total": 0}
                    
                    monthly_data[month_key]["total"] += 1
                    if classification == 'ACIDENTE':
                        monthly_data[month_key]["accidents"] += 1
                    elif classification == 'INCIDENTE GRAVE':
                        monthly_data[month_key]["serious_incidents"] += 1
                    else:
                        monthly_data[month_key]["incidents"] += 1
                        
                except Exception as date_error:
                    print(f"Erro ao processar data: {date_str} - {date_error}")
                    continue
        
        # Converter para lista e ordenar por data
        result = []
        for month, data in monthly_data.items():
            result.append({
                "month": month,
                "accidents": data["accidents"],
                "serious_incidents": data["serious_incidents"],
                "incidents": data["incidents"],
                "total": data["total"]
            })
        
        # Ordenar por mês (simplificado, pode ser melhorado)
        return sorted(result, key=lambda x: x["month"])[:12]
        
    except Exception as e:
        # Retornar dados mock em caso de erro
        return [
            { "month": "Jan/24", "accidents": 12, "serious_incidents": 8, "incidents": 25, "total": 45 },
            { "month": "Fev/24", "accidents": 15, "serious_incidents": 12, "incidents": 28, "total": 55 },
        ]

@app.get("/stats/contributing-factors")
async def get_contributing_factors(year: str = None):
    """Retorna os principais fatores contribuintes"""
    try:
        query = supabase.table('fatores_contribuintes').select('fator_nome')
        if year and year != "all":
            query = query.gte('created_at', f'{year}-01-01').lte('created_at', f'{year}-12-31')
        
        response = query.execute()
        
        if not response.data:
            # Retornar dados mock
            return [
                { "factor": "Julgamento de Pilotagem", "count": 245, "percentage": 23 },
                { "factor": "Condições Meteorológicas", "count": 189, "percentage": 18 },
                { "factor": "Falha de Motor", "count": 156, "percentage": 15 },
            ]
        
        # Processar dados reais
        factor_counts = {}
        for item in response.data:
            factor = item.get('fator_nome', 'N/A')
            factor_counts[factor] = factor_counts.get(factor, 0) + 1
        
        total = sum(factor_counts.values())
        result = []
        for factor, count in factor_counts.items():
            percentage = round((count / total) * 100) if total > 0 else 0
            result.append({
                "factor": factor,
                "count": count,
                "percentage": percentage
            })
        
        return sorted(result, key=lambda x: x["count"], reverse=True)[:8]
        
    except Exception as e:
        # Retornar dados mock em caso de erro
        return [
            { "factor": "Julgamento de Pilotagem", "count": 245, "percentage": 23 },
            { "factor": "Condições Meteorológicas", "count": 189, "percentage": 18 },
        ]

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
