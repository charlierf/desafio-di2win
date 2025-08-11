# 📖 Histórico de Desenvolvimento - Projeto CENIPA

## 🎯 Contexto do Projeto

### Desafio di2win - UFS 2025.1
**Disciplina**: Tópicos em Inteligência Artificial  
**Instituição**: Universidade Federal de Sergipe (UFS)  
**Período**: 2025.1  
**Empresa**: di2win  

### Equipe
- **Charlie Rodrigues Fonseca**
- **Elana Tanan Sande**

### Principais Aprendizados
1. **Integridade de Dados**: Validação cuidadosa de merges em dados relacionais
2. **Pensamento Crítico**: Questionar mudanças bruscas no tamanho dos datasets
3. **Escolha de Métricas**: Priorizar recall em contextos de segurança/saúde
4. **Conhecimento de Domínio**: Compreensão das relações entre tabelas CENIPA
5. **Gestão de Escopo**: Priorização de funcionalidades essenciais
6. **Trade-offs Conscientes**: Recall > Acurácia para não perder casos críticos

### Valor do Desafio di2win
O formato de **liberdade total** do desafio proporcionou:
- **Autonomia na definição** do problema e solução
- **Experiência realista** de tomada de decisões técnicas
- **Aprendizado iterativo** com correções de curso
- **Portfolio building** com projeto demonstrável
- **Conexão academia-indústria** através de desafio real

### Proposta do Desafio
A di2win apresentou um desafio aberto com as seguintes diretrizes:
1. **Escolher uma base de dados** entre as opções fornecidas
2. **Explorar os dados** (Análise Exploratória)
3. **Implementar um modelo de ML** para resolver algum problema
4. **Liberdade total** na definição do objetivo e abordagem
5. **Desafio adicional**: Criar uma interface web

### Nossa Escolha: Dados CENIPA
Optamos por trabalhar com os dados do **CENIPA** (Centro de Investigação e Prevenção de Acidentes Aeronáuticos) por representarem um domínio interessante e socialmente relevante, com potencial para desenvolvimento de sistemas preditivos de segurança aeronáutica.

---

## 🚀 Fases do Desenvolvimento

### 📊 Fase 1: Análise Exploratória (Notebooks)

#### Notebook 01: ETL (Extract, Transform, Load)
**Arquivo**: `01_ETL_cenipa.ipynb` | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/01_ETL_cenipa.ipynb)

**Objetivos Alcançados:**
- Carregamento e limpeza dos datasets CENIPA
- Tratamento de dados faltantes
- Padronização de formatos
- Criação do dataset unificado

**Principais Desafios:**
- Múltiplas tabelas com relacionamentos complexos
- Dados inconsistentes e formatos diversos
- Encoding de caracteres especiais

#### Notebook 02: EDA (Exploratory Data Analysis)
**Arquivo**: `02_EDA_cenipa.ipynb` | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/02_EDA_cenipa.ipynb)

**Descobertas Principais:**
- Distribuição geográfica das ocorrências
- Padrões temporais (sazonalidade, tendências)
- Tipos de aeronaves mais envolvidas
- Gravidade das ocorrências por categoria
- Fatores contribuintes mais comuns

**🔍 Insight Crucial - Anomalia Temporal:**
Durante a análise temporal, identificamos um **salto significativo** no número de ocorrências em 2024:
- **Observação**: Número de ocorrências **mais que dobrou** comparado aos anos anteriores
- **Investigação**: O aumento foi puxado pelos **incidentes**, enquanto acidentes e incidentes graves permaneceram estáveis
- **Descoberta**: Em **abril de 2023**, a ANAC publicou a **Resolução 714**, expandindo a obrigatoriedade de reportes
- **Impacto na Estratégia**: Esta anomalia nos levou a descartar a abordagem de **análise de séries temporais** inicialmente considerada

**Definição da Abordagem do Projeto:**
- **Abordagem Original Considerada**: Série temporal para analisar tendências
- **Problema Identificado**: Dados com quebra estrutural devido à mudança regulatória
- **Decisão**: Mudança para **classificação de gravidade** (Grave vs. Não Grave)
- **Justificativa**: Abordagem mais robusta aos efeitos da mudança regulatória

**Visualizações Criadas:**
- Mapas de calor por estados
- Séries temporais de ocorrências (com identificação da anomalia 2024)
- Distribuições por tipo de aeronave
- Correlações entre variáveis
- Análise do impacto da Resolução 714/2023

### 🤖 Fase 2: Modelagem Preditiva

#### Notebook 03: Modelagem
**Arquivo**: `03_Modelagem_Preditiva_CENIPA.ipynb` | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/03_Modelagem_Preditiva_CENIPA.ipynb)

**Problema Definido:**
Classificar ocorrências aeronáuticas como **Grave** (Acidentes e Incidentes Graves) ou **Não Grave** (Incidentes).

**Contexto da Escolha:**
Com base na descoberta da anomalia temporal causada pela Resolução ANAC 714/2023, optamos por uma abordagem de **classificação** em vez de **predição temporal**, focando na gravidade das ocorrências - uma característica menos suscetível às mudanças regulatórias de reporte.

#### Primeira Versão do Modelo (Problemática)

**Abordagem Inicial:**
- Junção de todas as tabelas disponíveis
- Uso de todas as features possíveis
- Algoritmo: XGBoost Classifier

**Resultados Iniciais:**
- RandomForest: 85.48% de acurácia
- XGBoost: 85.05% de acurácia  
- Métricas promissoras, mas artificialmente infladas

**⚠️ Problema Identificado:**
Após revisão metodológica, descobrimos um problema de **duplicação de dados**:

1. **Merge inadequado**: A tabela `fator_contribuinte` tinha relação n:1 com ocorrências
2. **Consequência**: Quando mesclamos as tabelas, as linhas se multiplicaram (~13k → 20k+)
3. **Resultado**: Mesmo sem usar colunas de `fator_contribuinte`, outras colunas ficaram duplicadas
4. **Impacto**: Overfitting por duplicação, inflacionando as métricas artificialmente

#### Segunda Versão do Modelo (Corrigida)

**Correções Implementadas:**
- **Correção do processo de merge** para evitar duplicação
- **Validação da integridade** dos dados após joins
- **Eliminação de registros duplicados** 
- **Redução do dataset** para o tamanho original (~13k linhas)

**Results da Versão Corrigida:**

| Métrica | RandomForest | XGBoost | Diferença |
|---------|-------------|---------|-----------|
| **Acurácia** | 80.46% | **82.47%** | ↓2-3% |
| **Precision 'Grave'** | 68.52% | **75.22%** | XGBoost melhor |
| **Recall 'Grave'** | **83.48%** ⭐ | 75.72% | **RandomForest superior** |

**Modelo Final Escolhido**: **RandomForest**

**Justificativa da Escolha:**
- **Recall** foi considerado a métrica mais importante
- **83.48%** de recall significa detectar mais casos graves
- Em segurança aeronáutica, **não perder casos graves** é crítico
- Trade-off aceitável: menor acurácia geral, mas melhor detecção do que importa

---

### 🌐 Fase 3: Interface Web (Desafio Adicional)

#### Decisão Arquitetural
Após completar a análise nos notebooks, decidimos aceitar o **desafio adicional** de criar uma interface web para demonstrar o modelo em funcionamento.

#### Backend: FastAPI
**Arquivo Principal**: `backend/main.py`

**Funcionalidades Implementadas:**
- **API RESTful** para servir o modelo ML
- **Endpoint de predição** com validação de entrada
- **Dashboard de dados** com estatísticas agregadas
- **Integração Supabase** para persistência
- **CORS configurado** para desenvolvimento

**Componentes Técnicos:**
- Carregamento do modelo serializado (joblib)
- Pré-processamento de dados de entrada
- Validação com Pydantic
- Tratamento de erros robusto

#### Frontend: React + TypeScript
**Tecnologias Escolhidas:**
- **React 18** com TypeScript
- **Vite** como build tool
- **Shadcn/UI** para componentes
- **Tailwind CSS** para estilização
- **Recharts** para visualizações

**Páginas Desenvolvidas:**
1. **Dashboard**: Interface planejada para análise de dados (em desenvolvimento)
2. **Predição**: Sistema funcional para usar o modelo ML ✅
3. **Navegação**: Roteamento entre funcionalidades

**Status de Implementação:**
- **✅ Sistema de Predição**: Totalmente funcional com RandomForest
- **⏳ Dashboard de Análise**: Interface criada, integração de dados pendente
- **✅ API Backend**: Endpoints operacionais
- **✅ Modelo Integrado**: RandomForest deployado e funcionando

---

## 🔍 Aprendizados e Desafios

### 🎓 Aprendizados Técnicos

#### 1. Descoberta Estratégica na EDA
**Lição**: Contexto regulatório impacta padrões dos dados
- Identificamos anomalia temporal significativa (2024: +100% ocorrências)
- Investigamos a causa: Resolução ANAC 714/2023 expandiu reportes obrigatórios
- Aprendemos que mudanças regulamentares podem quebrar séries temporais
- Decidimos pivotar de séries temporais para classificação de gravidade

#### 2. Importância da Integridade dos Dados  
**Lição**: Merges inadequados podem comprometer modelos
- Identificamos duplicação através de análise cuidadosa do tamanho do dataset
- Aprendemos a validar a integridade após operações de merge
- Desenvolvemos maior atenção à origem e estrutura dos dados relacionais

#### 2. Complexidade dos Dados Reais
**Desafios Enfrentados**:
- Dados inconsistentes e com formato variável
- Relacionamentos complexos entre tabelas
- Necessidade de conhecimento do domínio aeronáutico
- Tratamento cuidadoso de dados temporais
- **Impacto de mudanças regulatórias** nos padrões históricos

#### 3. Desenvolvimento Full-Stack
**Experiência Integrada**:
- **Data Science**: ETL, EDA, ML completos
- **Backend**: API design e model serving
- **Frontend**: Interface moderna e responsiva
- **Deploy**: Considerações de produção

### 🚧 Principais Desafios

#### 1. Descoberta da Anomalia Temporal
**Problema**: A anomalia 2024 não era óbvia inicialmente
**Solução**: Investigação da causa através de pesquisa regulatória
**Descoberta**: Resolução ANAC 714/2023 explicou o padrão
**Resultado**: Mudança estratégica de abordagem (temporal → classificação)

#### 2. Detecção da Duplicação de Dados
**Problema**: A duplicação não era óbvia inicialmente
**Solução**: Monitoramento do tamanho do dataset após merges
**Tempo Investido**: Significativo, mas essencial para modelo correto

#### 2. Trade-off Performance vs. Correção
**Dilema**: Aceitar métricas inferiores pela correção metodológica
**Decisão**: Priorizar integridade dos dados
**Resultado**: Modelo confiável, RandomForest escolhido por recall superior (83.48%)

#### 3. Escolha da Métrica Crítica
**Desafio**: Balancear acurácia vs recall em contexto de segurança
**Decisão**: Priorizar **Recall** para não perder casos graves
**Resultado**: RandomForest escolhido apesar de menor acurácia geral

#### 4. Desenvolvimento Frontend Parcial
**Desafio**: Tempo limitado para implementação completa
**Resultado**: Sistema de predição funcional, dashboard em desenvolvimento
**Aprendizado**: Priorização de funcionalidades essenciais

---

## 📊 Comparação: Antes vs. Depois da Correção

### Versão 1 (Com Duplicação)
| Métrica | RandomForest | XGBoost | Status |
|---------|-------------|---------|---------|
| **Metodologia** | ❌ Duplicação | ❌ Duplicação | Problemática |
| **Acurácia** | 85.48% | 85.05% | Inflacionada |
| **Dataset Size** | ~20k+ linhas | ~20k+ linhas | Duplicado |
| **Confiabilidade** | ❌ Baixa | ❌ Baixa | Overfitting |

### Versão 2 (Corrigida)
| Métrica | RandomForest | XGBoost | Status |
|---------|-------------|---------|---------|
| **Metodologia** | ✅ Correta | ✅ Correta | Válida |
| **Acurácia** | 80.46% | 82.47% | Realista |
| **Recall 'Grave'** | **83.48%** ⭐ | 75.72% | **RF Escolhido** |
| **Dataset Size** | ~13k linhas | ~13k linhas | Original |
| **Confiabilidade** | ✅ Alta | ✅ Alta | Deployável |
| **Escolha Final** | **✅ Selecionado** | Descartado | **Recall prioritário** |

---

## 🛠️ Aspectos Técnicos Detalhados

### Pipeline de Dados
1. **Raw Data** → CSVs do CENIPA
2. **ETL** → Limpeza e padronização  
3. **Feature Engineering** → Criação de variáveis preditivas
4. **Validação Temporal** → Remoção de vazamentos
5. **Model Training** → XGBoost com validação cruzada
6. **Serialização** → Joblib para deploy
7. **API Integration** → FastAPI serving
8. **Web Interface** → React consumer

### Arquitetura de Deploy
```
Frontend (React) → Backend (FastAPI) → Modelo (XGBoost) → Dados (Supabase)
```

### Considerações de Produção
- **Versionamento de modelo** com joblib
- **Validação de entrada** robusta
- **Tratamento de erros** apropriado
- **Logging** para debugging
- **CORS** para segurança

---

## 🎯 Resultados e Impacto

### Objetivos do Desafio: ✅ Parcialmente Completos
- [x] **Análise de dados**: EDA completa com insights valiosos
- [x] **Modelo ML**: RandomForest para classificação de gravidade (83.48% recall)
- [x] **Interface web**: Sistema de predição funcional
- [⏳] **Dashboard completo**: Interface criada, integração de dados em desenvolvimento

### Valor Entregue
1. **Sistema de predição funcional** com modelo RandomForest deployado
2. **Análise compreensiva** dos dados CENIPA (notebooks completos)
3. **Interface web profissional** para demonstração (predição operacional)
4. **Metodologia correta** sem duplicação de dados
5. **Escolha técnica fundamentada** (Recall > Acurácia para segurança)
6. **Experiência de projeto** end-to-end (parcial)

### Impacto Acadêmico
- **Demonstração prática** de conceitos teóricos
- **Identificação e correção** de problemas reais em ML
- **Experiência multidisciplinar** (DS + Web Dev)
- **Projeto portfolio** completo e demonstrável

---

## 🔮 Próximos Passos e Melhorias

### Melhorias Técnicas Imediatas
- [ ] **Otimização do modelo corrigido** com feature engineering avançado
- [ ] **Balanceamento de classes** para lidar com desbalanceamento
- [ ] **Validação cruzada temporal** mais robusta
- [ ] **Ensemble methods** para melhorar performance

### Funcionalidades Futuras
- [ ] **Filtros temporais** mais granulares no dashboard
- [ ] **Alertas automáticos** baseados em padrões
- [ ] **Integração com APIs externas** (meteorologia, tráfego aéreo)
- [ ] **Análise de texto** dos relatórios narrativos
- [ ] **Geolocalização avançada** com mapas interativos

### Considerações de Produção
- [ ] **Containerização** com Docker
- [ ] **CI/CD pipeline** automatizado
- [ ] **Monitoramento** de modelo em produção
- [ ] **A/B testing** para validação contínua
- [ ] **Backup e recuperação** de dados

---

## 💡 Reflexões Finais

### Principais Aprendizados
1. **Qualidade > Quantidade**: Correção metodológica supera métricas artificiais
2. **Pensamento Crítico**: Questionar resultados "bons demais"
3. **Conhecimento de Domínio**: Essencial para validação adequada
4. **Integração Complexa**: Desafios reais de projetos full-stack
5. **Experiência Completa**: Da pesquisa ao deploy funcional

### Valor do Desafio di2win
O formato aberto do desafio proporcionou:
- **Liberdade criativa** na escolha de problemas
- **Experiência realista** de projeto de DS/ML
- **Aprendizado through doing** mais efetivo que exercícios teóricos
- **Portfolio building** com projeto demonstrável
- **Conexão academia-indústria** através de problema real

### Recomendações para Futuros Participantes
1. **Monitore o tamanho** dos datasets após operações de merge
2. **Valide sempre a integridade** dos dados processados  
3. **Documente o processo** de desenvolvimento e decisões
4. **Priorize funcionalidades** essenciais para entrega no prazo
5. **Trabalhem em equipe**: Divisão de tarefas potencializa resultados
6. **Liberdade total**: Aproveitem para explorar problemas que os interessam

---

## 🔗 Recursos e Links

### 📊 Acesso aos Notebooks
Execute diretamente no Google Colab:

| Notebook | Link Colab |
|----------|-----------|
| **01 - ETL CENIPA** | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/01_ETL_cenipa.ipynb) |
| **02 - EDA CENIPA** | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/02_EDA_cenipa.ipynb) |
| **03 - Modelagem Preditiva** | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/03_Modelagem_Preditiva_CENIPA.ipynb) |
| **Apresentação do Projeto** | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/Apresentacao_Projeto_CENIPA.ipynb) |

### 🌐 Repositório
- **GitHub**: [https://github.com/charlierf/desafio-di2win](https://github.com/charlierf/desafio-di2win)

---

**Documento elaborado por**: Charlie Rodrigues Fonseca e Elana Tanan Sande  
**Data**: Agosto 2025  
**Contexto**: Desafio di2win - UFS 2025.1  
**Status**: Sistema de Predição Concluído ✅ | Dashboard em Desenvolvimento ⏳  
