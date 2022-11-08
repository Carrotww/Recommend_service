window.onload = () => {
    console.log("로딩되었음")
    show_tag_fuc()
}

async function postArticles(title, content) {

    const articleData = {
        "title": title,
        "content": content,
    }
    console.log(articleData)

    const response = await fetch('http://121.140.94.38:8000/articles/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', //데이터 타입은 JSON//
            'Authorization': "Bearer " + localStorage.getItem("access") //로그인시 로컬 저장소에 저장되는 토큰 가져오기//
        },
        body: JSON.stringify(articleData)

    })
    window.location.replace('http://121.140.94.38:5500/frontend/post/list.html') //글 등록이 되고 리스트 화면으로 링크//
}


async function handleButton() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    console.log(title, content)
    const response = await fetch('http://121.140.94.38:8000/articles/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "title": title,
            "content": content

        })
    })
}

async function post_ditail_view(id) {
    window.location.href = `http: //121.140.94.38:5500/post/` + id + `/`
}

async function show_tag_fuc() {
    const post_data = await fetch('http://121.140.94.38:8000/articles/', {
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
            return data
        });
    var temp = document.getElementById("top");
    for (i = 0; i < post_data.length; i++) {
        // const temptemp = document.createElement("div")
        const temp_div1 = document.createElement("div")
        const temp_div2 = document.createElement("div")
        const temp_div3 = document.createElement("div")
        const temp_div4 = document.createElement("div")
        const temp_div5 = document.createElement("div")
        temp_div1.setAttribute("class", "num")
        temp_div2.setAttribute("class", "title")
        temp_div2.setAttribute("id", post_data[i]["pk"])
        temp_div2.setAttribute("onclick", "go_detail_post(this.id)")
        temp_div3.setAttribute("class", "writer")
        temp_div4.setAttribute("class", "date")
        temp_div5.setAttribute("class", "count")
        temp_div1.innerText = post_data[i]['pk']
        temp_div2.innerText = post_data[i]['title']
        temp_div3.innerText = post_data[i]['user']
        temp_div4.innerText = post_data[i]['user']
        temp_div5.innerText = post_data[i]['likes_count']
        temp.appendChild(temp_div1)
        temp.appendChild(temp_div2)
        temp.appendChild(temp_div3)
        temp.appendChild(temp_div4)
        temp.appendChild(temp_div5)
    }
}

async function go_detail_post(pk) {
    location.href = 'view.html';
    localStorage.setItem('pk', pk)
}