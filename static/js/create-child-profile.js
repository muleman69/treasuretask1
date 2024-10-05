document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('child-profile-form');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const pinInput = document.getElementById('pin');
    const submitButton = document.getElementById('submit-button');
    const messageDiv = document.getElementById('message');

    function validateForm() {
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        const pin = pinInput.value.trim();

        if (name.length === 0) {
            showMessage('Please enter the child\'s name.', 'error');
            return false;
        }

        if (isNaN(age) || age < 1 || age > 18) {
            showMessage('Please enter a valid age between 1 and 18.', 'error');
            return false;
        }

        if (pin.length !== 4 || !/^\d+$/.test(pin)) {
            showMessage('Please enter a valid 4-digit PIN.', 'error');
            return false;
        }

        return true;
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'text-red-500' : 'text-green-500';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            const formData = {
                name: nameInput.value.trim(),
                age: parseInt(ageInput.value),
                pin: pinInput.value
            };

            fetch('/add_child', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage(data.message, 'success');
                    form.reset();
                } else {
                    showMessage(data.message, 'error');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                showMessage('An error occurred. Please try again.', 'error');
            });
        }
    });
});
