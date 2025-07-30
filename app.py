import streamlit as st
import pandas as pd
import joblib

# Carregar o modelo e as opções do formulário
model_components = joblib.load('modelo_cenipa_final.joblib')
model = model_components['model']
model_columns = model_components['model_columns']
opcoes_form = joblib.load('opcoes_formulario.joblib')

# --- Interface do Usuário com Streamlit ---

# Título da Aplicação
st.title('Previsão de Gravidade de Ocorrências Aeronáuticas ✈️')

# Descrição
st.markdown("""
Esta aplicação utiliza um modelo de Machine Learning (XGBoost com 84% de acurácia) 
para prever se uma ocorrência aeronáutica tem potencial de ser **Grave** (Acidente / Incidente Grave) 
ou **Não Grave** (Incidente) com base em suas características iniciais.
""")

st.markdown("---")

# Criando os menus de seleção (formulário)
st.sidebar.header('Selecione as Características da Ocorrência:')

uf = st.sidebar.selectbox('Estado (UF) da Ocorrência:', opcoes_form['ocorrencia_uf'])
tipo_veiculo = st.sidebar.selectbox('Tipo de Veículo:', opcoes_form['aeronave_tipo_veiculo'])
motor_tipo = st.sidebar.selectbox('Tipo do Motor:', opcoes_form['aeronave_motor_tipo'])
segmento = st.sidebar.selectbox('Segmento da Aviação:', opcoes_form['aeronave_registro_segmento'])
fase_operacao = st.sidebar.selectbox('Fase da Operação no Momento da Ocorrência:', opcoes_form['aeronave_fase_operacao'])

# Botão para fazer a previsão
if st.sidebar.button('Prever Gravidade'):
    
    # --- Processamento dos Dados de Entrada ---
    
    # 1. Criar um DataFrame com os dados de entrada do usuário
    input_data = {
        'ocorrencia_uf': [uf],
        'aeronave_tipo_veiculo': [tipo_veiculo],
        'aeronave_motor_tipo': [motor_tipo],
        'aeronave_registro_segmento': [segmento],
        'aeronave_fase_operacao': [fase_operacao]
    }
    input_df = pd.DataFrame(input_data)
    
    # 2. Aplicar o One-Hot Encoding nos dados de entrada
    input_encoded = pd.get_dummies(input_df)
    
    # 3. Alinhar as colunas com o DataFrame que o modelo espera
    # Garante que o input tenha exatamente as mesmas 85 colunas, na mesma ordem
    input_aligned = input_encoded.reindex(columns=model_columns, fill_value=0)
    
    # --- Fazer a Previsão ---
    prediction = model.predict(input_aligned)
    probability = model.predict_proba(input_aligned)
    
    # --- Exibir o Resultado ---
    st.subheader('Resultado da Previsão:')
    
    if prediction[0] == 1:
        st.error('**ALTO RISCO de Ocorrência Grave** (Acidente / Incidente Grave)')
    else:
        st.success('**BAIXO RISCO de Ocorrência Grave** (Incidente)')
        
    st.write(f"Probabilidade de ser 'Grave': **{probability[0][1]:.2%}**")
    st.write(f"Probabilidade de ser 'Não Grave': **{probability[0][0]:.2%}**")

    st.markdown("---")
    st.write("Valores de Entrada Utilizados na Previsão:")
    st.dataframe(input_df)