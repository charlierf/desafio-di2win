# 📋 Resumo Executivo - Projeto CENIPA

## 🎯 Visão Geral
**Projeto**: Sistema de Análise Preditiva para Dados CENIPA  
**Contexto**: Desafio di2win - Disciplina Tópicos em IA (UFS 2025.1)  
**Equipe**: Charlie Rodrigues Fonseca & Elana Tanan Sande  
**Status**: ✅ Sistema de Predição Funcional | ⏳ Dashboard em Desenvolvimento  

## 🚀 Problema Resolvido
Desenvolver um sistema completo de análise e predição de gravidade de ocorrências aeronáuticas usando dados do CENIPA, incluindo interface web para demonstração.

## 💡 Solução Implementada

### 📊 Análise de Dados
- **ETL completo** dos dados CENIPA (13k+ registros)
- **EDA abrangente** com insights geográficos e temporais
- **Descoberta crucial**: Anomalia temporal 2024 (Resolução ANAC 714/2023)
- **Decisão estratégica**: Mudança de séries temporais para classificação
- **Feature engineering** com validação temporal rigorosa

### 🤖 Modelo de Machine Learning
- **Algoritmo**: RandomForest Classifier (**escolhido por recall superior**)
- **Métrica crítica**: 83.48% de recall para casos graves
- **Objetivo**: Classificação binária (Grave vs. Não Grave)
- **Correção Metodológica**: Eliminação de duplicação de dados
- **Deploy**: Modelo funcional integrado à API web

### 🌐 Interface Web
- **Frontend**: React + TypeScript + Shadcn/UI
- **Backend**: FastAPI + Supabase  
- **Status**: Sistema de predição funcional ✅, Dashboard em desenvolvimento ⏳

## 🔧 Solução Técnica Corrigida

### 🔍 Descoberta Estratégica (EDA)
- **Anomalia identificada**: Salto nas ocorrências em 2024 (mais que o dobro)
- **Causa descoberta**: Resolução ANAC 714 (abril/2023) expandiu reportes obrigatórios
- **Impacto**: Aumento puxado por incidentes, não acidentes graves
- **Decisão**: Descarte de análise de séries temporais, foco em classificação de gravidade

### ⚠️ Problema Técnico (Modelagem)
- **Duplicação de dados**: Merge inadequado com tabela `fator_contribuinte` (relação n:1)
- **Consequência**: Dataset inflado de ~13k para 20k+ linhas
- **Impacto**: Overfitting por duplicação, métricas artificialmente altas

### ✅ Correção Implementada  
- **Correção do processo de merge** para eliminar duplicação
- **Validação da integridade** dos dados após joins
- **Escolha técnica fundamentada**: RandomForest por recall superior (83.48%)
- **Trade-off consciente**: Menor acurácia geral, mas melhor detecção de casos críticos

## ⚡ Principais Conquistas

### ✅ Objetivos Alcançados
- [x] **Análise exploratória completa** dos dados CENIPA
- [x] **Modelo ML funcional** RandomForest (83.48% recall para casos graves)
- [x] **Sistema de predição web** operacional e deployado
- [x] **API backend robusta** com modelo integrado
- [x] **Escolha técnica fundamentada** (Recall > Acurácia para segurança)
- [⏳] **Interface completa**: Predição funcional, dashboard em desenvolvimento

### 🎓 Aprendizados Valiosos
1. **Descoberta estratégica**: Identificação da anomalia temporal (Resolução ANAC 714/2023)
2. **Pivotagem de abordagem**: Mudança de séries temporais para classificação
3. **Detecção e correção de duplicação de dados** em merges inadequados
4. **Priorização de métricas críticas** (Recall > Acurácia em segurança)
5. **Desenvolvimento web integrado** com modelo ML em produção
6. **Gestão de escopo** e priorização de funcionalidades essenciais
7. **Trade-offs técnicos conscientes** baseados no contexto do problema

## 📈 Valor Entregue

### Para o Desafio
- **Sistema de predição funcional** e deployado
- **Metodologia cientificamente rigorosa**
- **Interface web demonstrável** (funcionalidade principal)
- **Documentação detalhada** do processo e aprendizados

### Para a Equipe
- **Portfolio projeto real**
- **Experiência multidisciplinar**
- **Aprendizado prático de correção metodológica**
- **Habilidades full-stack**

### Para a Academia
- **Exemplo de projeto prático** com desafios reais
- **Caso de estudo** de correção de duplicação de dados
- **Demonstração de gestão de escopo** em projetos de ML
- **Integração teoria-prática** com entrega funcional

## 🏆 Diferencial Competitivo
1. **Correção metodológica proativa** (duplicação de dados)
2. **Sistema de predição funcional** além dos notebooks
3. **Documentação abrangente** do processo completo
4. **Modelo deployado** e operacional
5. **Experiência prática** de DS/ML com entrega real

## 🔮 Potencial Futuro
- **Base sólida** para extensões
- **Metodologia replicável** para outros datasets
- **Sistema escalável** para mais features
- **Referência** para projetos similares

---

## 🎯 Conclusão
O projeto atendeu com sucesso os objetivos principais do desafio, entregando **sistema de predição funcional** com **metodologia cientificamente rigorosa**. O aprendizado mais valioso foi detectar e corrigir problemas de **integridade de dados** (duplicação por merge inadequado) e fazer **escolhas técnicas fundamentadas** - priorizando **Recall (83.48%)** sobre acurácia geral para melhor detectar casos graves em contexto de segurança aeronáutica.

**Resultado**: Sistema de predição operacional com RandomForest deployado, interface web funcional, representando uma experiência valiosa de desenvolvimento em ciência de dados com decisões técnicas conscientes.

**Status Final**: Funcionalidade principal (predição) completamente operacional ✅, desenvolvimento do dashboard em andamento ⏳.

## 🔗 Recursos

### 📊 Notebooks Executáveis
| Notebook | Colab |
|----------|-------|
| **ETL CENIPA** | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/01_ETL_cenipa.ipynb) |
| **EDA CENIPA** | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/02_EDA_cenipa.ipynb) |
| **Modelagem Preditiva** | [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/charlierf/desafio-di2win/blob/main/notebooks/03_Modelagem_Preditiva_CENIPA.ipynb) |

### 🌐 Código Fonte
- **GitHub**: [https://github.com/charlierf/desafio-di2win](https://github.com/charlierf/desafio-di2win)

---
*Elaborado por: Charlie Rodrigues Fonseca & Elana Tanan Sande - UFS 2025.1*
