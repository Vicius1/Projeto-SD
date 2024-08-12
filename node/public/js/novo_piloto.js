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

