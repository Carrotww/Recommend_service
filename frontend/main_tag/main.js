window.onload = ()=>{
    console.log("load")
    show_tag_fuc() // backend에서 tag 가져오기

}   


// // tag 불러오는 함수

async function show_tag_fuc() {
    const response = await fetch('http://210.113.127.22:8000/music/', {
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
        console.log(data)
        var tags= document.getElementById("tags");
        for (i=0; i < data.length; i++){
            const t = document.createElement("button");
            // t.class = "mylabel"
            // t.type = "checkbox"
            t.onclick ='dosomething(this.innerText)'
            t.innerText = data[i]['category']
            const tag = tags.appendChild(t)
        }
    });
}

function dosomething(val){
    console.log(val);
}

async function is_checked() {
    console.log("음악추천받기 버튼 클릭"); // 버튼이 눌러지고 있는 지 확인 필수

   
    // for (i=0; i < tags.length; i++){
       
    //     const check_box = document.getElementById("tags");
    //     if (check_box.checked) {
    //         let tags = document.getElementById(i).innerText;
    //         console.log(tags)
    //     } 
    // }
    // console.log(tags);

    // const response = await fetch('http://210.113.127.22:8000/music/', {
    //     headers:{
    //         'content-type':'application/json',
    //     },
    //     method:'POST',
    //     body: JSON.stringify({
    //         "category":tags
    //     })
    // })
    // const response_json = await response.json();
}

