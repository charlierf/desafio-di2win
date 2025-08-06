# 🛩️ Sistema de Análise Preditiva CENIPA

Sistema completo de análise de dados aeronáuticos baseado nos dados do CENIPA (Centro de Investigação e Prevenção de Acidentes Aeronáuticos), com interface web moderna e modelo de machine learning para predição de gravidade de ocorrências.

## 📋 Sobre o Projeto

Este sistema foi desenvolvido a partir de notebooks Jupyter de análise exploratória e modelagem, evoluindo para uma aplicação web completa que inclui:

- **Dashboard interativo** com visualizações de dados em tempo real
- **Sistema de predição** usando XGBoost para avaliar gravidade de ocorrências
- **Interface moderna** construída com React + TypeScript + Shadcn/UI
- **API robusta** em FastAPI com integração Supabase
- **Análise completa** dos dados CENIPA desde ETL até deployment

## 🏗️ Arquitetura do Sistema

```
desafio-di2win/
├── 📊 notebooks/           # Jupyter notebooks de análise e modelagem
├── 🎯 backend/            # API FastAPI + Modelo ML
├── 🌐 frontend/           # Interface React + TypeScript
├── 📁 data/              # Datasets CENIPA processados
└── 📖 README.md          # Documentação do projeto
```

## ✨ Funcionalidades Implementadas

### 🔍 Dashboard de Análise
- **Estatísticas Gerais**: Total de ocorrências, acidentes e fatalidades
- **Distribuição Geográfica**: Ocorrências por estado brasileiro
- **Tipos de Aeronaves**: Distribuição por categoria de aeronave
- **Tendências Temporais**: Análise de evolução mensal
- **Fatores Contribuintes**: Principais causas de acidentes
- **Ocorrências Recentes**: Lista das últimas ocorrências registradas

### 🤖 Sistema Preditivo
- **Modelo XGBoost** treinado com 84% de acurácia
- **Interface intuitiva** para entrada de dados
- **Predição de gravidade** com níveis de confiança
- **Análise de probabilidades** para tomada de decisão

### 🎨 Interface Moderna
- **Design responsivo** para desktop e mobile
- **Tema escuro/claro** configurável
- **Componentes reutilizáveis** com Shadcn/UI
- **Navegação intuitiva** entre funcionalidades
- **Visualizações interativas** com Recharts

## 🚀 Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido
- **XGBoost** - Modelo de machine learning
- **Pandas** - Manipulação e análise de dados
- **Supabase** - Banco de dados e infraestrutura
- **Uvicorn** - Servidor ASGI de alta performance

### Frontend
- **React 18** - Biblioteca de interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e moderno
- **Shadcn/UI** - Componentes de interface elegantes
- **Tailwind CSS** - Framework de utilitários CSS
- **Recharts** - Biblioteca de gráficos responsivos
- **Axios** - Cliente HTTP para APIs

### Análise de Dados
- **Jupyter Notebook** - Ambiente de desenvolvimento
- **Pandas** - Manipulação de dados
- **Scikit-learn** - Ferramentas de machine learning
- **Matplotlib/Seaborn** - Visualização de dados

## 📊 Conjunto de Dados

Os dados utilizados são provenientes do **CENIPA** e incluem:
- **Ocorrências aeronáuticas** desde 2008
- **Informações de aeronaves** envolvidas
- **Fatores contribuintes** para acidentes
- **Dados geográficos** e temporais
- **Classificação de gravidade** das ocorrências

## 🎯 Modelo de Machine Learning

### Características do Modelo
- **Algoritmo**: XGBoost Classifier
- **Acurácia**: 84%
- **Features**: 85 variáveis categóricas (one-hot encoded)
- **Target**: Classificação binária (Grave / Não Grave)

### Variáveis Preditoras
- Estado da ocorrência (UF)
- Tipo de veículo (aeronave)
- Tipo de motor
- Segmento de registro
- Fase da operação

## 🚦 Como Executar

### Pré-requisitos
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Backend
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Acesso
- **Dashboard**: http://localhost:8080
- **API**: http://localhost:8000
- **Documentação API**: http://localhost:8000/docs

## 📈 Resultados Obtidos

### Performance do Modelo
- **Acurácia geral**: 84%
- **Predições variáveis**: Diferentes probabilidades para cenários distintos
- **Confiança adaptativa**: Níveis Alto/Médio/Baixo baseados na certeza

### Insights dos Dados
- **1000+ ocorrências** analisadas
- **98 acidentes** identificados no dataset
- **10 estados** com maior incidência
- **Tendências temporais** identificadas

## 🔮 Próximos Passos

- [ ] Implementação de filtros temporais mais granulares
- [ ] Adição de mais variáveis ao modelo preditivo
- [ ] Sistema de alertas automáticos
- [ ] Integração com APIs externas de meteorologia
- [ ] Análise de sentimento em relatórios textuais

## 📝 Documentação Técnica

Para mais detalhes sobre a implementação, consulte:
- `/notebooks/` - Análise exploratória e desenvolvimento do modelo
- `/backend/main.py` - Código principal da API
- `/frontend/src/` - Código-fonte da interface

## 🤝 Contribuições

Este projeto representa uma implementação completa de um sistema de análise preditiva, desde a exploração inicial dos dados em notebooks até uma aplicação web funcional com modelo de machine learning em produção.
