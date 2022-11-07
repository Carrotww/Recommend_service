window.onload = () => {
    console.log("load")
}

let btn = document.querySelector('.btn');
let about = document.querySelector('.about');
btn.addEventListener('click', function() {
    if (this.innterText == "More") {
        about.style.display = "block";
        this.innterText = "Less";
    } else {
        about.style.display = "none";
        this.innterText = "More";
    }
})


ProfileMain()

async function ProfileMain() {
    // 로컬스토리지에 payload 가져와서 파싱한 뒤에 ['username'] 가져오기
    var payload = JSON.parse(localStorage.getItem('payload')); // 로컬스트리지에 저장된 payload 호출
    var user_id = payload['user_id']


    const response = await fetch('http://121.140.94.38:8000/users/' + user_id + '/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'GET',
    })

    .then(response => {
        return response.json();
    })

    .then(data => {
        console.log(data)
    })
}
on