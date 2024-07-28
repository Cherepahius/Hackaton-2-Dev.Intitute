const login = document.getElementById("loginForm")

async function loginUser(e) {
    e.preventDefault()
    const newuser = document.getElementById("username").value
    const newPassword = document.getElementById("password").value

    try {
        const response = await fetch('http://localhost:3000/users/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: newuser, password: newPassword })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
            
        }

        const data = await response.json();
        if ('error' in data) {
            alert("incorrect password")
        } else {
            alert('Success: logged in');
        }


        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
    } catch (error) {
        console.log(error)
        console.error('Error registering', error);
    }
}


login.addEventListener("submit", function(e) {
    loginUser(e)
})