// 입력 없으면 표시 
window.onload = () => {
    console.log("load")
}

async function check_value() {
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
}
// window.addEventListener('load', () => {
//     const forms = document.getElementsByClassName('validation-form');
//     Array.prototype.filter.call(forms, (form) => {
//         form.addEventListener('submit', function(event) {
//             if (form.checkValidity() === false) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//             form.classList.add('was-validated');
//         }, false);
//     });
// }, false);

async function handleSignUp() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
        // const response = await fetch('http://127.0.0.1:8000/users/signup/', {
    const response = await fetch('http://121.140.94.38:8000/users/signup/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });
    move_page('signin.html');
}

function go_Signin() {
    console.log('gogogogogo')
    move_page('../user/signin.html');
}

function move_page(page) {
    window.location.href = page
}