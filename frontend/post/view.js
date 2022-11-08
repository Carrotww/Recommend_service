window.onload = () => {
    console.log("로딩되었음")
    var pk = localStorage.getItem('pk')
    console.log(pk)
    get_post(pk)
}



// 포스트 상세페이지에 
async function get_post(pk) {
    const current_pk = pk
        // 요청 보내기
        // 반환값으로 html에 뿌려주기
    const num = document.getElementById("num")
    const name = document.getElementById("name")
    const date = document.getElementById("date")
    const like = document.getElementById("like")
    const content = document.getElementById("content")
    const title = document.getElementById("title")

    const response = await fetch('http://127.0.0.1:8000/articles/' + pk + '/', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'GET',
        })
        // backend에서 받은 데이터 가져오기
        .then(response => {
            return response.json();
        })
        // Promise 안에 담긴 데이터 꺼내오기
        .then(data => {
            num.innerText = data['pk']
            name.innerText = data['user']
            date.innerText = data['updated_at']
            like.innerText = data['likes_count']
            content.innerText = data['content']
            title.innerText = data['title']
        })
        // num, name, date, like, content -> html id 이름
}