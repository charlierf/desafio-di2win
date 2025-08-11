# 🛩️ Sistema de Análise Preditiva CENIPA

Sistema completo de análise de dados aeronáuticos baseado nos dados do CENIPA (Centro de Investigação e Prevenção de Acidentes Aeronáuticos), desenvolvido como parte do **Desafio di2win 2025.1** na disciplina de Tópicos em Inteligência Artificial da Universidade Federal de Sergipe (UFS).

## 📋 Sobre o Projeto

Desenvolvido por **Charlie Rodrigues Fonseca** e **Elana Tanan Sande**, este projeto representa uma análise completa dos dados CENIPA, desde a exploração inicial em notebooks Jupyter até uma aplicação web funcional com modelo de machine learning para predição de gravidade de ocorrências aeronáuticas.

### 🎯 Contexto do Desafio
O desafio proposto pela empresa **di2win** consistia em:
- Escolher uma das bases de dados fornecidas
- Realizar exploração e análise dos dados (EDA)  
- Implementar um modelo de Machine Learning
- **Desafio adicional**: Criar uma interface web

Nossa equipe escolheu trabalhar com os **dados do CENIPA**, focando na predição de gravidade de ocorrências aeronáuticas.


## 🏗️ Evolução do Projeto

O sistema evoluiu através das seguintes etapas:

1. **📊 Análise Exploratória** - ETL e EDA nos notebooks
2. **🔍 Descoberta Estratégica** - Identificação da anomalia temporal (Resolução ANAC 714/2023)
3. **🤖 Modelagem Preditiva** - Desenvolvimento e refinamento do modelo ML
4. **🌐 Interface Web** - Desenvolvimento da aplicação React + FastAPI
5. **🔧 Correções Metodológicas** - Refinamento do modelo para maior precisão

### 🔍 Descoberta que Direcionou o Projeto
Durante a EDA, identificamos um **insight crucial**:
- **Anomalia Temporal**: Salto significativo nas ocorrências em 2024 (mais que o dobro)
- **Investigação**: Aumento puxado por incidentes, não por acidentes graves
- **Causa**: Resolução ANAC 714 (abril/2023) expandiu obrigatoriedade de reportes
- **Impacto Estratégico**: Descartamos análise de séries temporais, optando por **classificação de gravidade**

### 🔄 Aprendizado e Correções
Durante o desenvolvimento, identificamos e corrigimos problemas metodológicos importantes:

**1. Descoberta Regulatória (EDA):**
- **Anomalia temporal**: Resolução ANAC 714/2023 alterou padrões de reporte
- **Impacto**: Mudança de abordagem de séries temporais para classificação

**2. Correção Técnica (Modelagem):**
- **Problema**: Merge inadequado com `fator_contribuinte` gerando duplicação (~13k → 20k+ linhas)
- **Solução**: Correção do processo de merge para eliminar duplicatas
- **Resultado**: Modelo metodologicamente correto (RandomForest escolhido por recall: 83.48%)

## 📁 Estrutura do Sistema

```
desafio-di2win/
├── 📊 notebooks/           # Jupyter notebooks (ETL → EDA → Modelagem)
│   ├── 01_ETL_cenipa.ipynb
│   ├── 02_EDA_cenipa.ipynb
│   ├── 03_Modelagem_Preditiva_CENIPA.ipynb
│   └── Apresentacao_Projeto_CENIPA.ipynb
├── 🎯 backend/            # API FastAPI + Modelo ML
├── 🌐 frontend/           # Interface React + TypeScript
├── 📁 data/              # Datasets CENIPA processados
└── 📖 docs/              # Documentação do projeto
```

## 🚀 Acesso Rápido aos Notebooks

Execute os notebooks diretamente no Google Colab:

| Notebook | Descrição | 🔗 Colab |
|----------|-----------|---------|
| **01 - ETL** | Extração, transformação e limpeza dos dados CENIPA | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/01_ETL_cenipa.ipynb) |
| **02 - EDA** | Análise exploratória com descoberta da anomalia 2024 | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/02_EDA_cenipa.ipynb) |
| **03 - Modelagem** | Treinamento e avaliação do modelo RandomForest | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/03_Modelagem_Preditiva_CENIPA.ipynb) |
| **Apresentação** | Síntese do projeto e resultados finais | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/Apresentacao_Projeto_CENIPA.ipynb) |

## ✨ Funcionalidades Implementadas

### 🔍 Dashboard de Análise (Em Desenvolvimento)
- **Estatísticas Gerais**: Total de ocorrências, acidentes e fatalidades
- **Distribuição Geográfica**: Ocorrências por estado brasileiro
- **Tipos de Aeronaves**: Distribuição por categoria de aeronave
- **Tendências Temporais**: Análise de evolução mensal
- **Fatores Contribuintes**: Principais causas de acidentes
- **Status**: Interface de predição funcional, dashboard em implementação

### 🤖 Sistema Preditivo
- **Modelo RandomForest** com recall de 83.48% para casos graves
- **Interface funcional** para entrada de dados
- **Predição de gravidade** (Grave vs. Não Grave)
- **Análise de probabilidades** para tomada de decisão
- **Correção metodológica** para eliminar duplicação de dados

### 🎨 Interface Moderna
- **Design responsivo** para desktop e mobile
- **Componentes reutilizáveis** com Shadcn/UI
- **Navegação intuitiva** entre funcionalidades
- **Visualizações interativas** com Recharts

## 🚀 Tecnologias Utilizadas

### Backend
- **FastAPI** - Framework web moderno e rápido
- **RandomForest Classifier e XGBoost** - Modelos de machine learning
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
- **Dados geográficos**
- **Classificação de gravidade** das ocorrências

## 🎯 Modelo de Machine Learning

### Evolução do Modelo
**Versão Inicial (com duplicação):**
- Merge inadequado incluía relação n:1 com `fator_contribuinte`
- Resultava em duplicação de linhas (13k → 20k+ registros)
- Métricas inflacionadas devido ao overfitting por duplicatas
- RandomForest: 85.48% | XGBoost: 85.05% de acurácia

**Versão Corrigida (atual):**
- **Algoritmo**: RandomForest Classifier (**escolhido por melhor Recall**)
- **Metodologia**: Correção do merge para eliminar duplicação
- **Recall 'Grave'**: **83.48%** (RandomForest) vs 75.72% (XGBoost) 
- **Acurácia**: 80.46% (RandomForest) vs 82.47% (XGBoost)
- **Features**: Variáveis categóricas (one-hot encoded)
- **Target**: Classificação binária (Grave / Não Grave)
- **Critério de Escolha**: **Recall priorizado** para detecção de casos graves

### Métricas de Performance (Versão Corrigida)

| Métrica | RandomForest | XGBoost | Vencedor |
|---------|-------------|---------|----------|
| **Acurácia (Validação)** | 80.46% | **82.47%** | XGBoost |
| **Precision 'Grave'** | 68.52% | **75.22%** | XGBoost |
| **Recall 'Grave'** | **83.48%** ⭐ | 75.72% | **RandomForest** |

**Modelo Escolhido**: **RandomForest** - Recall superior é crítico para não perder casos graves

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

## 📈 Resultados e Aprendizados

### Lições Aprendidas
- **Importância do merge cuidadoso** em dados relacionais
- **Detecção de duplicação não intencional** de registros
- **Trade-off entre performance e correção metodológica**
- **Experiência completa**: da pesquisa ao deploy (parcial)

### Status da Implementação
- **✅ Notebooks**: ETL, EDA e Modelagem completos
- **✅ Modelo ML**: RandomForest treinado e validado (83.48% recall para casos graves)
- **✅ Backend API**: FastAPI funcional com modelo integrado
- **✅ Interface de Predição**: Sistema web operacional
- **⏳ Dashboard**: Interface de análise em desenvolvimento

### Dataset CENIPA
- **13.000+ ocorrências** analisadas (versão corrigida)
- **Período**: Dados históricos do CENIPA
- **Cobertura**: Todo território nacional  
- **Tipos**: Acidentes, Incidentes Graves e Incidentes

## 🔮 Próximos Passos

### Melhorias Técnicas
- [ ] Otimização das métricas do modelo corrigido
- [ ] Implementação de técnicas de balanceamento de classes
- [ ] Validação cruzada mais robusta
- [ ] Feature engineering avançado

### Funcionalidades
- [ ] Finalização do dashboard de análise no frontend
- [ ] Integração completa frontend-backend para visualizações
- [ ] Sistema de alertas automáticos
- [ ] Integração com APIs externas (meteorologia, tráfego aéreo)
- [ ] Análise de sentimento em relatórios textuais

## 👥 Equipe

**Desenvolvido por:**
- **Charlie Rodrigues Fonseca**
- **Elana Tanan Sande**

**Contexto Acadêmico:**
- **Disciplina**: Tópicos em Inteligência Artificial
- **Instituição**: Universidade Federal de Sergipe (UFS)
- **Período**: 2025.1
- **Desafio**: di2win

## 📝 Documentação Técnica

Para mais detalhes sobre a implementação:
- **`/notebooks/`** - Processo completo: ETL → EDA → Modelagem
- **`/backend/main.py`** - API FastAPI e integração do modelo
- **`/frontend/src/`** - Interface React com TypeScript
- **`/docs/DESENVOLVIMENTO.md`** - Histórico detalhado do desenvolvimento

## 🔗 Links Úteis

### 📊 Repositório e Notebooks
- **GitHub**: [https://github.com/charlierf/desafio-di2win](https://github.com/charlierf/desafio-di2win)
- **Notebooks no Colab**: Veja a seção "Acesso Rápido aos Notebooks" acima

### 📖 Documentação Adicional
- **Histórico de Desenvolvimento**: [`/docs/DESENVOLVIMENTO.md`](docs/DESENVOLVIMENTO.md)
- **Resumo Executivo**: [`/docs/RESUMO_EXECUTIVO.md`](docs/RESUMO_EXECUTIVO.md)

## 🤝 Considerações Finais

Este projeto representa uma jornada completa de desenvolvimento em ciência de dados, desde a análise exploratória inicial até uma aplicação web funcional. O aprendizado mais valioso foi a identificação e correção de vieses metodológicos, demonstrando que **a correção técnica é mais importante que métricas artificialmente elevadas**.

A experiência proporcionada pelo **Desafio di2win** foi fundamental para consolidar conhecimentos teóricos em uma aplicação prática real. O aprendizado mais valioso foi a identificação e correção de problemas metodológicos (duplicação de dados), demonstrando que **a correção técnica é mais importante que métricas artificialmente elevadas**. 

O projeto alcançou com sucesso o objetivo principal (sistema de predição funcional) e parcialmente o desafio adicional (interface web com predição operacional, dashboard em desenvolvimento).
