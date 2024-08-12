FROM node:14

# Criar diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install express body-parser chart.js nodemailer

# Copiar código fonte
COPY . .

# Expor a porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]

