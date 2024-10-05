document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('submit-button');
    const messageDiv = document.getElementById('message');

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'text-red-500' : 'text-green-500';
    }

    function checkLoginStatus() {
        fetch('/check_login_status')
            .then(response => response.json())
            .then(data => {
                if (data.logged_in) {
                    console.log('User is logged in, ID:', data.user_id);
                    window.location.href = '/dashboard';
                } else {
                    console.log('User is not logged in');
                    showMessage('Login successful, but session not established. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error checking login status:', error);
                showMessage('An error occurred. Please try again.', 'error');
            });
    }

    function testLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }

    console.log('localStorage available:', testLocalStorage());

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Login submission initiated');
        const formData = new FormData(form);

        formData.append('device_type', getDeviceType());

        console.log('Attempting fetch API for login');
        fetch('/login', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        .then(response => {
            console.log('Server response received, status:', response.status);
            console.log('Login response headers:', response.headers);
            console.log('Cookies:', document.cookie);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.success) {
                console.log('Login successful, redirecting to:', data.redirect);
                setTimeout(checkLoginStatus, 1000);
            } else {
                console.error('Login failed:', data.message);
                showMessage(data.message, 'error');
            }
        })
        .catch((error) => {
            console.error('Error during login:', error);
            showMessage('An error occurred. Please try again.', 'error');
            console.log('Attempting fallback submission');
            fallbackSubmit();
        });
    }

    function fallbackSubmit() {
        console.log('Executing fallback submission');
        form.submit();
    }

    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }

    form.addEventListener('submit', handleSubmit);
    submitButton.addEventListener('click', handleSubmit);
    submitButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        handleSubmit(e);
    });

    emailInput.addEventListener('touchend', function() {
        this.focus();
    });

    passwordInput.addEventListener('touchend', function() {
        this.focus();
    });
});
