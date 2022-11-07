window.onload = ()=>{
    console.log("recommend.js 로딩완료");
    get_username()
    recommend_info_fuc()
    
}
// 사용자 이름 가져오는 함수
async function get_username() {
    var payload = JSON.parse(localStorage.getItem('payload')); // 로컬스트리지에 저장된 payload 호출
    const payload_parse = JSON.parse(payload); // payload 파싱
    var username = document.getElementById("username"); // html 요소 호출
    username.innerText = payload_parse.username; 
}


// 추천곡들의 정보를 쿠카에서 불러오는 함수
async function recommend_info_fuc() {
  
    var music_data = JSON.parse(localStorage.getItem('tempdata'));
    var all_music = document.getElementById("all_music");
    // var music = document.getElementById("music");
    for (i=0; i < music_data.length; i++) {
    console.log('가수 :', music_data[i]['singer'], '제목 :', music_data[i]['title'], 'url :', music_data[i]['url'])
    const music = document.getElementById("music"+i);
    // 곡 좋아요
    const music_like = document.createElement("input"); // div 생성 (아티스트)
    music_like.setAttribute("type","checkbox"); // clss 지정 (아티스트)
    music_like.className = "music_like" + i;
    // music_like.setAttribute("id",i); // clss 지정 (아티스트)
    music.appendChild(music_like) // all_tags 안에 tag 추가 (아티스트)
    
    // 음악 제목 
    const music_title = document.createElement("div"); // div 생성 (제목)
    music_title.setAttribute("class","music_title"); // clss 지정 (제목)
    music_title.innerText = music_data[i]['title']; // div 내용 텍스트 (제목)
    music.appendChild(music_title) // all_tags 안에 tag 추가 (제목)
    

    // 아티스트
    const music_singer = document.createElement("div"); // div 생성 (아티스트)
    music_singer.setAttribute("class","music_singer"); // clss 지정 (아티스트)
    music_singer.innerText = music_data[i]['singer']; // div 내용 텍스트 (아티스트) 
    music.appendChild(music_singer) // all_tags 안에 tag 추가 (아티스트)
   

    // // 곡 상세페이지로 이동하는 버튼
    // const music_info = document.createElement("div"); // div 생성 (유튜브링크)
    // music_info.setAttribute("onclick","location.href="+music_data[i]['url']);
    // music_info.setAttribute("class","music_info"); // clss 지정 (유튜브링크) -> 상세페이지로 넘어가도록
    // music_info.innerText = "곡정보확인"; // div 내용 텍스트 (유튜브링크) /// 나중에 삭제 확인용 코드
    // const music_infos = music.appendChild(music_info) // all_tags 안에 tag 추가 (유튜브링크)
    }
};


// 곡 좋아요 기능 -> 하트아이콘 생성 시 onclick으로 해당 함수 실행
async function music_like_fuc(num) {
    var music = document.getElementById("music_like_"+num);
    music.setAttribute("class","music_like_fill"+num); // 채워진 하트 스타일로 다시 지정
}
