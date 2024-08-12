// Código para index.html
if (document.getElementById('myChart')) {
    function fetchAndRenderChart() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Ordenar os dados por pontos em ordem decrescente
                data.sort((a, b) => b[1] - a[1]);

                // Preparar dados para o gráfico
                const labels = data.map(item => item[0]);
                const points = data.map(item => item[1]);

                // Gerar gráfico
                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Pontos',
                            data: points,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Erro ao carregar os dados do gráfico:', error));
    }

    // Inicializa o gráfico ao carregar a página
    fetchAndRenderChart();
}

// Código para novo_piloto.html
if (document.getElementById('pilotForm')) {
    document.getElementById('pilotForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const points = parseInt(document.getElementById('points').value);

        const messageElement = document.getElementById('message');

        // Validação dos dados
        if (points < 0) {
            messageElement.innerText = 'Erro: Os pontos do piloto não podem ser negativos.';
            messageElement.style.color = 'red';
            alert('Erro: Os pontos do piloto não podem ser negativos.');
            return;
        }

        fetch('/notify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                name: name,
                points: points
            })
        })
        .then(response => response.text())
        .then(data => {
            messageElement.innerText = 'Piloto cadastrado com sucesso!';
            messageElement.style.color = 'green';
            document.getElementById('pilotForm').reset();
        })
        .catch(error => {
            messageElement.innerText = 'Erro ao cadastrar piloto.';
            messageElement.style.color = 'red';
            console.error('Erro ao cadastrar piloto:', error);
        });
    });
}

