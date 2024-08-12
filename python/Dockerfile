FROM ubuntu:latest

# Atualize e instale pacotes necessários
RUN apt update && \
    apt-get install -y python3 python3-pip python3-venv wget nano curl

# Crie a pasta Dev
RUN mkdir /Dev

# Baixe a página usando wget com um user-agent específico e defina timeout
RUN wget --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36" \
    --timeout=30 -P /home/ubuntu/ https://www.grandepremio.com.br/f1/classificacao

# Copie o arquivo data_cleaning.py para a pasta Dev no contêiner
COPY data_cleaning.py /Dev/

# Crie o ambiente virtual na pasta Dev
RUN python3 -m venv /Dev/venv

# Ative o ambiente virtual e instale o BeautifulSoup4 e requests
RUN /bin/bash -c "source /Dev/venv/bin/activate && pip install beautifulsoup4 requests"

# Defina o diretório de trabalho para /Dev
WORKDIR /Dev

# Comando para ativar o ambiente virtual e executar o script data_cleaning.py
CMD ["/bin/bash", "-c", "source /Dev/venv/bin/activate && python data_cleaning.py"]

