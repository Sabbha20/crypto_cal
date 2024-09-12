document.getElementById('portfolioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const symbol = document.getElementById('symbol').value.toUpperCase();
    const weight = parseFloat(document.getElementById('weight').value);
    const interval = document.getElementById('interval').value;

    // Input validation
    if (!/^[A-Z0-9-_]+$/.test(symbol)) {
        showError("Invalid symbol format. Use uppercase letters, numbers, hyphen or underscore.");
        return;
    }

    if (weight < 0 || weight > 1) {
        showError("Weight must be between 0 and 1.");
        return;
    }

    fetch('/compute-symbol', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol, weight, interval }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        hideError();
        const labels = data.map(item => new Date(item.close_time * 1000).toLocaleString());
        const values = data.map(item => item.value);
        
        // Clear previous chart
        document.getElementById('chartContainer').innerHTML = '<canvas id="performanceChart" class="img-fluid"></canvas>';
        
        const ctx = document.getElementById('performanceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `${symbol} Performance`,
                    data: values,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
        showError(error.error || 'An unexpected error occurred. Please try again.');
    });
});

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.remove('d-none');
}

function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = '';
    errorElement.classList.add('d-none');
}