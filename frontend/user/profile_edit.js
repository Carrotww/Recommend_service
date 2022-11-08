window.onload = () => {
    console.log("load")
}

async function ProfileEdit() {
    const username = document.getElementById("username").value
    const image = document.getElementById("image").value
    const post_likes = document.getElementById("post_likes").value

    const response = await fetch('http: //127.0.0.1:8000/users/' + user_id + '/profileedit', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            "username": username,
            "image": image,
            "post_likes": post_likes,
        })
    })

    .then(response => {
        return response.json();
    })

    .then(data => {
        console.log(data)
    })
}