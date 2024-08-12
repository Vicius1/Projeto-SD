import requests
from bs4 import BeautifulSoup

# Caminho para o arquivo HTML baixado
file_path = '/home/ubuntu/classificacao'

# Ler o conteúdo do arquivo HTML
with open(file_path, 'r', encoding='utf-8') as file:
    html_content = file.read()

# Analisar o conteúdo HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Encontrar a tabela de classificação
table = soup.find('table', class_='table classificacao table-striped')

# Extrair os dados da tabela
pilotos_pontos = []
for row in table.find_all('tr')[1:]:  # Pular o cabeçalho da tabela
    cols = row.find_all('td')
    if len(cols) >= 5:  # Verificar se há colunas suficientes na linha
        piloto = cols[2].text.strip()
        pontos = cols[4].text.strip()
        pilotos_pontos.append((piloto, pontos))

#Exibir os pilotos e seus pontos
for piloto, pontos in pilotos_pontos:
	print(f'Piloto: {piloto}, Pontos: {pontos}')

# URL do servidor Node.js (ajuste se necessário)
url = 'http://172.17.0.2:3000/upload'

# Enviar os dados via POST para o servidor Node.js
response = requests.post(url, json=pilotos_pontos)

# Verificar a resposta do servidor
if response.status_code == 200:
    print("Dados enviados com sucesso!")
else:
    print(f"Erro ao enviar dados: {response.status_code}")

