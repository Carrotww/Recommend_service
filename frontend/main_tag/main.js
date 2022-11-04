window.onload = ()=>{
    console.log("load")

    show_tag_fuc() // backend에서 tag 가져오기
    alltag = new Array(); // 전체 테그 담을 리스트 선언

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
        console.log(data) // tag 목록 확인
        var tags= document.getElementById("all_tags");
        for (i=0; i < data.length; i++){
            const tag = document.createElement("button"); // 버튼 요소 생성
            tag.setAttribute("class","mylabel") // css class 지정
            tag.setAttribute("onclick","TagsPick(this.innerText)") // 선택한 버튼 클릭 시 해당 함수 호출
            tag.innerText = data[i]['category'] // 버튼이름 값 지정
            const tags = all_tags.appendChild(tag) // all_tags 안에 tag 추가
            console.log(tags)
        }
    });
}


// tag 값 목록으로 묶어주기
async function AllTagsPick(val) {
    if (alltag.includes(val)){
        for(i=0; i < alltag.length; i++){
            if (alltag[i] == val){
                alltag.splice(i,i);
                i--; // 해당 인덱스도 삭제
            } 
        }
    }
    else {
        if (alltag.length == 5){
            alert("6개 이상 tag를 선택할 수 없습니다.")
        }
        else {
            alltag.push(val);
        }
    }
}


// tag 버튼 값 가져오기
async function TagsPick(val) {
    AllTagsPick(val);   
}


// 테그들 목록 백엔드로 POST 전달 <확인버튼>
async function AllTagPost() {
    var str = ""
    for (i=0; i < alltag.length; i++) {
        if (i == alltag.length-1) {
            str += alltag[i]
        }
        else {
            str += alltag[i]+","
        }
    }
    console.log(str)
    const response = await fetch('http://210.113.127.22:8000/music_search/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify({
            "category":str
        })
    })
    const response_json = await response.json();
    return response_json

}