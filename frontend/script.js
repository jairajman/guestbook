// frontend/script.js

document.getElementById('guestForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
        const response = await fetch('http://localhost:3000/api/entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, phone, message })
        });

        if (response.ok) {
            document.getElementById('guestForm').reset();
            form.classList.remove('was-validated');
            document.getElementById('successMsg').classList.remove('d-none');
            setTimeout(() => {
                document.getElementById('successMsg').classList.add('d-none');
            }, 3000);
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error connecting to server.');
    }
});