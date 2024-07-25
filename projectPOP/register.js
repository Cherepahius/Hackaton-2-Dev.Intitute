const register = document.getElementById("registerForm")

async function registerUser(e) {
    e.preventDefault()
    const newuser = document.getElementById("username").value
    const newPassword = document.getElementById("password").value

    try {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newuser ,password: newPassword })
        });

        if (!response.ok) {
            alert("email or user already in use")
            throw new Error('Network response was not ok');
            
        }

        const data = await response.json();
        if ('error' in data) {
            alert("that user already exists")
        } else {
            alert('Success: new user registered');
        }


        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
    } catch (error) {
        console.error('Error registering', error);
    }
}


register.addEventListener("submit", function(e) {
registerUser(e)
})