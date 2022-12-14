// 입력 없으면 표시 현재 구현 안됨
window.onload = () => {
    console.log("load")
}

window.addEventListener('load', () => {
    const forms = document.getElementsByClassName('validation-form');

    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
}, false);


async function handleSignIn() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
        // const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })

    const response_json = await response.json()

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);

    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    move_page('../main_tag/main.html')

}
handleSignIn()


async function handleMock() {
    // const response = await fetch('http://127.0.0.1:8000/users/mock/', {
    const response = await fetch('http://127.0.0.1:8000/users/mock/', {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
}

async function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}

async function go_Signup() {
    move_page('signup.html');
}

function move_page(page) {
    window.location.href = page
}