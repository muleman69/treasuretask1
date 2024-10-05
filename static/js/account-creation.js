document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('account-creation-form');
    const messageDiv = document.getElementById('message');

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'text-red-500' : 'text-green-500';
    }

    function submitForm(formData) {
        fetch('/create_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage(data.message, 'success');
                window.location.href = data.redirect;
            } else {
                showMessage(data.message, 'error');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.', 'error');
            // Fallback to traditional form submission
            form.submit();
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        submitForm(formData);
    });
});
