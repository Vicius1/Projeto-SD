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

