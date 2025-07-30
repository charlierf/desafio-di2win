# Análise de Dados de Ocorrências Aeronáuticas - CENIPA

## Descrição do Projeto

Este projeto consiste em uma análise completa dos dados de ocorrências aeronáuticas fornecidos pelo Centro de Investigação e Prevenção de Acidentes Aeronáuticos (CENIPA). O objetivo é aplicar técnicas de ciência de dados para extrair insights relevantes sobre as causas e características dos incidentes, acidentes e ocorrências graves na aviação brasileira.

**🎯 PROJETO COMPLETO:** Este repositório contém uma solução end-to-end, desde a análise exploratória até uma aplicação web interativa para predição de gravidade de ocorrências aeronáuticas.

### Etapas do Projeto

O projeto está organizado em três notebooks principais + aplicação web:

1. **ETL (Extract, Transform, Load)** - Processo de extração, transformação e carregamento dos dados
2. **EDA (Exploratory Data Analysis)** - Análise exploratória para identificação de padrões e insights
3. **Modelagem Preditiva** - Desenvolvimento de modelos de machine learning para predição de ocorrências
4. **Aplicação Web (Streamlit)** - Interface interativa para uso do modelo em produção

### Conjunto de Dados

O projeto utiliza dados públicos do CENIPA, incluindo:
- **ocorrencia.csv** - Dados principais das ocorrências
- **aeronave.csv** - Informações sobre as aeronaves envolvidas
- **fator_contribuinte.csv** - Fatores que contribuíram para as ocorrências
- **ocorrencia_tipo.csv** - Tipos de ocorrências
- **recomendacao.csv** - Recomendações de segurança
- **cenipa_master.csv** - Dataset consolidado após processo de ETL

## 🎯 Modelo de Machine Learning

### Desempenho do Modelo Final (XGBoost)
- **Acurácia:** 84.21% no conjunto de teste
- **Precision (Grave):** 83%
- **Recall (Grave):** 92%
- **F1-Score (Grave):** 87%

O modelo é capaz de predizer com alta precisão se uma ocorrência aeronáutica tem potencial de ser **Grave** (Acidente/Incidente Grave) ou **Não Grave** (Incidente) com base em características como:
- Estado da ocorrência (UF)
- Tipo de aeronave
- Tipo de motor
- Segmento da aviação
- Fase da operação

## 🚀 Aplicação Web

### Como Executar a Aplicação

1. **Instalar dependências:**
```bash
pip install streamlit pandas joblib scikit-learn xgboost
```

2. **Executar a aplicação:**
```bash
streamlit run app.py
```

3. **Acessar no navegador:** A aplicação abrirá automaticamente em `http://localhost:8501`

### Funcionalidades da Aplicação
- Interface intuitiva para inserção de dados da ocorrência
- Predição em tempo real da gravidade
- Visualização das probabilidades de classificação
- Feedback visual do nível de risco (Alto/Baixo)

## 📓 Notebooks

### Abrir no Google Colab

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/01_ETL_cenipa.ipynb) **01 - ETL e Preparação dos Dados**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/02_EDA_cenipa.ipynb) **02 - Análise Exploratória de Dados**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/03_Modelagem_Preditiva_CENIPA.ipynb) **03 - Modelagem Preditiva**

## 🔍 Principais Análises Realizadas

### Análise Exploratória (EDA)
- Distribuição temporal das ocorrências aeronáuticas ao longo dos anos
- Análise geográfica dos incidentes por região do Brasil
- Identificação dos principais fatores contribuintes para acidentes
- Classificação de severidade das ocorrências (Grave vs. Não Grave)
- Padrões relacionados a tipos de aeronaves e operações
- Análise de correlações entre variáveis

### Insights Principais
- Identificação de padrões sazonais nas ocorrências
- Estados e regiões com maior incidência de acidentes graves
- Tipos de aeronaves e fases de operação mais críticas
- Fatores de risco mais relevantes para predição

### Modelagem Preditiva
- Comparação de múltiplos algoritmos (Random Forest, XGBoost)
- Seleção de features baseada em importância
- Validação cruzada e otimização de hiperparâmetros
- Avaliação robusta com métricas detalhadas

## 🚀 Tecnologias Utilizadas

### Análise de Dados e ML
- **Python** - Linguagem principal
- **Pandas** - Manipulação e análise de dados
- **NumPy** - Computação numérica
- **Matplotlib & Seaborn** - Visualização de dados
- **Scikit-learn** - Pré-processamento e métricas
- **XGBoost** - Algoritmo de machine learning (modelo final)
- **Joblib** - Serialização de modelos

### Aplicação Web
- **Streamlit** - Framework para criação da interface web
- **Pandas** - Manipulação de dados na aplicação

### Ambiente de Desenvolvimento
- **Jupyter Notebook** - Ambiente de desenvolvimento e análise
- **VS Code** - Editor de código
- **Git** - Controle de versão

## 📁 Estrutura do Projeto

```
desafio-di2win/
├── 01_ETL_cenipa.ipynb              # Notebook de ETL
├── 02_EDA_cenipa.ipynb              # Notebook de análise exploratória
├── 03_Modelagem_Preditiva_CENIPA.ipynb  # Notebook de modelagem
├── app.py                           # Aplicação Streamlit
├── modelo_cenipa_final.joblib       # Modelo treinado (XGBoost)
├── opcoes_formulario.joblib         # Opções para interface
├── data/                            # Dados do projeto
│   ├── cenipa_master.csv           # Dataset principal processado
│   ├── ocorrencia.csv              # Dados de ocorrências
│   ├── aeronave.csv                # Dados de aeronaves
│   ├── fator_contribuinte.csv      # Fatores contribuintes
│   ├── ocorrencia_tipo.csv         # Tipos de ocorrências
│   └── recomendacao.csv            # Recomendações
└── README.md                        # Documentação do projeto
```

## 👥 Autores

Este projeto foi desenvolvido por:

- **Charlie Rodrigues Fonseca**
- **Elana Tanan Sande**

**Disciplina:** Tópicos de Inteligência Artificial 2025.1  
**Instituição:** Universidade Federal de Sergipe (UFS)

## 📊 Status do Projeto

✅ **PROJETO CONCLUÍDO** - Análise completa com modelo em produção

### Entregáveis Finalizados:
- [x] ETL completo dos dados CENIPA
- [x] Análise exploratória detalhada
- [x] Modelo de machine learning com 84% de acurácia
- [x] Aplicação web interativa funcional
- [x] Documentação completa

### Resultados Alcançados:
- Modelo XGBoost otimizado para predição de gravidade
- Interface web para uso prático do modelo
- Insights valiosos sobre segurança aeronáutica no Brasil
- Pipeline completo de ciência de dados implementado

## 🎯 Próximos Passos (Melhorias Futuras)

- [ ] Deploy da aplicação em plataforma cloud (Heroku/Streamlit Cloud)
- [ ] Incorporação de novos dados e features
- [ ] Desenvolvimento de dashboard analítico
- [ ] API REST para integração com outros sistemas
- [ ] Análise temporal mais aprofundada (séries temporais)

## 🔄 Como Reproduzir o Projeto

### 1. Clonar o Repositório
```bash
git clone https://github.com/charlierf/desafio-di2win.git
cd desafio-di2win
```

### 2. Instalar Dependências
```bash
pip install pandas numpy matplotlib seaborn scikit-learn xgboost streamlit joblib jupyter
```

### 3. Executar os Notebooks
Execute os notebooks na sequência:
1. `01_ETL_cenipa.ipynb` - Para processamento dos dados
2. `02_EDA_cenipa.ipynb` - Para análise exploratória
3. `03_Modelagem_Preditiva_CENIPA.ipynb` - Para treinamento do modelo

### 4. Executar a Aplicação
```bash
streamlit run app.py
```

### 5. Dados
Os dados estão disponíveis na pasta `data/` e foram obtidos do site oficial do CENIPA.

---

> **Nota:** Este projeto faz parte do desafio de ciência de dados da Di2win e tem fins acadêmicos e educacionais.