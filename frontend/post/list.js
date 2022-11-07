
window.onload = () => {
  console.log("로딩되었음")
  show_tag_fuc() 
}


// async function loadArticles(){
//     const response = await fetch('http://127.0.0.1:8000/articles/', {method : 'GET'})

//     response_json = await response.json()

//     console.log(response_json)

//     // .then(response => response.json())
//     // .then(data => {
//     //   const username = document.getElementById("usename");


//       // const pk = document.createElement("div");
//       // const phone = document.createElement("div");
//     }



async function postArticles(){
  const response = await fetch('http://127.0.0.1:8000/articles/', {method : 'POST'})

  response_json = await response.json()

  console.log(response_json)

  body : JSON.stringify({
      "title" : title,
      "writer" : writer
  })


  }





  async function handleButton(){
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    console.log(title, content)
    const response = await fetch('http://127.0.0.1:8000/articles/', {
      headers:{
          'content-type':'application/json',
      },
      method:'POST',
      body : JSON.stringify({
        "title" : title,
        "content" : content
        
      })

  })
  }

  async function show_tag_fuc() {
    const response = await fetch('http://127.0.0.1:8000/articles/', {
        headers:{
            'content-type':'application/json',
        },
        method:'GET',
    })
    // backend에서 받은 데이터 가져오기
    .then(response => {
        return response.json();
      })
    // Promise 안에 담긴 데이터 꺼내오기
    .then(data => {
        let append_div = document.querySelector(".board_list")
        console.log(append_div)

      
      append_div.innerHTML  =   ""
      let new_top = document.createElement ("div")
      new_top.className = "top"
      new_top.innerHTML = ` <div class="num">번호</div>
                            <div class="title">제목</div>
                            <div class="writer">글쓴이</div>
                            <div class="date">작성일</div>
                            <div class="count">좋아요</div>`
      
      append_div.append(new_top)
      data.forEach(element => {
        let new_item = document.createElement ("div")
        new_item.innerHTML = `<div class="num">5</div>
                              <div class="title"><a href="view.html">글 제목이 들어갑니다.</a></div>
                              <div class="writer">김이름</div>
                              <div class="date">2021.1.15</div>
                              <div class="count">33</div> `
        append_div.append(new_item)

        });
      });
}
