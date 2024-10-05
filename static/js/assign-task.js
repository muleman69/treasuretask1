document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-assignment-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const pointsInput = document.getElementById('points');
    const childSelect = document.getElementById('child');
    const submitButton = document.getElementById('submit-button');
    const messageDiv = document.getElementById('message');

    function validateForm() {
        const title = titleInput.value.trim();
        const points = parseInt(pointsInput.value);
        const childId = childSelect.value;

        if (title.length === 0) {
            showMessage('Please enter a task title.', 'error');
            return false;
        }

        if (isNaN(points) || points < 1) {
            showMessage('Please enter a valid number of points (minimum 1).', 'error');
            return false;
        }

        if (childId === "") {
            showMessage('Please select a child to assign the task to.', 'error');
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
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim(),
                points: parseInt(pointsInput.value),
                child_id: parseInt(childSelect.value)
            };

            fetch('/add_task', {
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
