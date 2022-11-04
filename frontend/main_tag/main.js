window.onload = ()=>{
    console.log("load")
    show_tag_fuc() // backend에서 tag 가져오기

}   


// tag 불러오는 함수
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
        for (i=0; i < data.length; i++){
            const tags= document.getElementById(i);
            tags.innerText = data[i]['category'];
            console.log(data[i]['category'])
        }
    });
}