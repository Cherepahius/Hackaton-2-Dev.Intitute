const login = document.getElementById("loginForm");

async function registerUser(e) {
    e.preventDefault();
    const newuser = document.getElementById("username").value;
    const newPassword = document.getElementById("password").value;

    console.log('Submitting:', { username: newuser, password: newPassword });

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: newuser, password: newPassword }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response data:', data);

        if ('error' in data) {
            alert("Incorrect password");
        } else {
            alert('Success: Logged in');
        }

        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
    } catch (error) {
        console.error('Error logging in', error);
    }
}

login.addEventListener("submit", function(e) {
    registerUser(e);
});