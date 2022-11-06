// 로딩이 완료되면 실행  | console.log()는 python의 print() 역할과 같음
window.onload = ()=>{
    console.log("로딩완료@@");
    recommend_info_fuc()
}

// 쿠키 가져오는 함수  (작업중입니다)

function getCookie = (key) => {
    let cookieKey = key + "="; 
    let value = "";
    const cookieArr = document.cookie.split("}");
    
    for(let i = 0; i < cookieArr.length; i++) {
      if(cookieArr[i][0] === " ") {
        cookieArr[i] = cookieArr[i].substring(1);
      }
      
      if(cookieArr[i].indexOf(cookieKey) === 0) {
        value = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
        return value;
      }
    }
    return value;
  }

// 추천곡들의 정보를 쿠카에서 불러오는 함수
async function recommend_info_fuc() {
    // 쿠키에서 정보 불러오기
    // 정보 추출, html 요소로 만들어주기
    document.cookie.
    console.log(response.json())

    // const response = await fetch('http://127.0.0.1:8000/music_search/', {
    //     headers:{
    //         'content-type':'application/json',
    //         // "Authorization":"Bearer "+localStorage.getItem("access")
    //     },
    //     method:'POST',
    // })
    // // backend에서 받은 데이터 가져오기
    // .then(response => {
    //     return response.json();
    //   })
    // // Promise 안에 담긴 데이터 꺼내오기
    // .then(data => {
    //     console.log(data)
    //     // var music= document.getElementById("music");
    //     // music.setAttribute("onclick","MusicDetail(this.innerText)")
        
    //     // const title = document.createElement("div"); // 곡 이름 div 생성
    //     // title.setAttribute("class","music_title") // css class 지정
    //     // title.innerText = data['title']
    //     // const music = music.appendChild(title)

    //     // const artist = document.createElement("div"); // 가수 이름 div 생성
    //     // artist.setAttribute("class","artist_title") // css class 지정
    //     // artist.innerText = data['artist']
    //     // const music = music.appendChild(artist)

    //     // const cover = document.createElement("div"); // 커버이미지 div 생성
    //     // cover.setAttribute("class","cover_title") // css class 지정
    //     // cover.setAttribute("onclick","MusicDetail(data['artist'])") // 선택한 버튼 클릭 시 해당 함수 호출
    //     // const music = music.appendChild(cover)

    //     // const link = document.createElement("button"); // 음원 링크 버튼 생성
    //     // link.setAttribute("onclick",data['link'])
    //     // link.innerText = "음원듣기"
    //     // const music = music.appendChild(link)
        

    //     // 검색 결과 도출 시 곡명, 가수이름, "곡 상세페이지 링크 받기"
    //     // 상세페이지 링크에서 이미지 크롤링해서 프로트로 보내주기
    //     // 백에서 가수 제목 이미지 음원링크 받기
    //     // 알아서 넣어주기

    //     // 검색 시 나오는 페이지도 비슷할 듯

    //     /// 아니면 미리 만들어둔 id 1번에 넣는방법도 있음 겟으로 가져와서 (그럼 추천 결과가 잘 안나와서 만일 1개라면 오류..)
    //     }
    // )
};
