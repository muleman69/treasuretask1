document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('child-login-form');
    const messageDiv = document.getElementById('message');

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'text-red-500' : 'text-green-500';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('/child_login', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                showMessage(data.message, 'error');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        });
    });
});
