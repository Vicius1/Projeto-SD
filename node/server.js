const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const os = require('os');

const app = express();
const port = 3000;

// Configuração do transporte com Outlook
var transport = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: 'gcc129.sd@outlook.com',
    pass: 'gcc129sd'
  }
});

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint para receber os dados
app.post('/upload', express.json(), (req, res) => {
    const filePath = path.join(__dirname, 'public', 'data.json');
    fs.writeFileSync(filePath, JSON.stringify(req.body));
    console.log(req.body);
    res.status(200).send('Dados recebidos com sucesso');
});

// Endpoint para a página com o gráfico
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para página de cadastro de piloto
app.get('/novo_piloto', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'novo_piloto.html'));
});

// Endpoint para notificar o cliente e atualizar o dataset
app.post('/notify', express.json(), (req, res) => {
    const { email, name, points } = req.body;
    
    if (points < 0) {
        return res.status(400).send('Os pontos não podem ser menores que 0.');
    }

    // Enviar o e-mail
    const mailOptions = {
        from: 'gcc129.sd@outlook.com',
        to: email,
        subject: 'Notificação de Evento',
        text: `Olá! O piloto ${name} com ${points} pontos foi registrado com sucesso!`
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).send('Erro ao enviar notificação.');
        }
        console.log('E-mail enviado:', info.response);

        // Atualizar o dataset com o novo piloto
        const dataFilePath = path.join(__dirname, 'public', 'data.json');

        fs.readFile(dataFilePath, (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo de dados:', err);
                return res.status(500).send('Erro ao atualizar o dataset.');
            }

            let dataset = [];
            try {
                dataset = JSON.parse(data);
            } catch (parseError) {
                console.error('Erro ao parsear o JSON do arquivo:', parseError);
            }

            // Atualizar dataset
            const existingIndex = dataset.findIndex(item => item[0] === name);
            if (existingIndex >= 0) {
                dataset[existingIndex][1] = points;
            } else {
                dataset.push([name, points]);
            }

            // Ordenar o dataset pelo número de pontos em ordem decrescente
            dataset.sort((a, b) => b[1] - a[1]);

            fs.writeFile(dataFilePath, JSON.stringify(dataset), (writeErr) => {
                if (writeErr) {
                    console.error('Erro ao escrever no arquivo de dados:', writeErr);
                    return res.status(500).send('Erro ao atualizar o dataset.');
                }
                res.status(200).send('Notificação e cadastro do piloto com sucesso.');
            });
        });
    });
});

// Função para obter o endereço IP local
function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Ignore interfaces que não sejam IPv4 ou que sejam internas (127.0.0.1)
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const ipAddress = getLocalIPAddress();

app.listen(port, () => {
    console.log(`Servidor rodando em http://${ipAddress}:${port}`);
});

