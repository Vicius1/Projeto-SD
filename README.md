#  Sistema distribuído de Scraping, Limpeza e Visualização de Dados
  Este projeto consiste em um sistema distribuído para visualização dos pontos do campeonato de pilotos da Fórmula 1, para isso é realizado web scraping, processamento de dados, e monitoramento de eventos. O sistema inclui um servidor central que recebe e processa dados de contêineres distribuídos, notifica os usuários sobre a adição de um novo piloto, e exibe os resultados em um frontend interativo.

## Containers Docker

### 1. Python
- Esse container é baseado na última versão do ubuntu e é responsável pelo scraping, limpeza e envio dos dados para o container Node.  
- O scraping é feito via bash.  
- A limpeza é feita pela biblioteca *BeautifulSoup* e o envio é feito pela biblioteca *requests* para a porta 3000 do container Node.

### 2. Node
- Esse container é baseado na versão 14 do Node e é responsável pela visualização dos dados e notificação de um novo piloto cadastrado pelo próprio usuário.  
- A visualização dos dados é feita através de um gráfico de barras pela biblioteca *chart.js*.  
- A notificação é feita por e-mail pela biblioteca *nodemailer* e exige que o usuário escolha o nome e quantidade de pontos do piloto a ser cadastrado, além do próprio e-mail que receberá a notificação.

## Execução do Sistema
- Como o projeto ainda não conta um Docker Compose, é necessário realizar duas etapas, primeiro o *build* dos containers e depois a execução.
- Para o *build* é necessário abrir terminais das pastas **python** e **node** do projeto e usar os seguintes comandos em cada um dos terminais:
 
      docker build -t nome-container .

- Após o *build* dos containers, para que seja feito com êxito, é necessário executar **primeiro** o container **node** e depois o **python**. Use o seguinte comando em cada um dos terminais anteriormente utilizados:

      docker run -it nome-container

> **Atenção**: 
> - Note que "**nome-container**" deverá ser alterado para o nome que o usuário desejar e, como temos dois containers, é necessário dois nomes **diferentes**.
