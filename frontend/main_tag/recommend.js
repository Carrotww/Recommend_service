// 로딩이 완료되면 실행  | console.log()는 python의 print() 역할과 같음
window.onload = ()=>{
    console.log("recommend.js 로딩완료");
    recommend_info_fuc()
}

// 추천곡들의 정보를 쿠카에서 불러오는 함수
async function recommend_info_fuc() {
    // 쿠키에서 정보 불러오기
    // 정보 추출, html 요소로 만들어주기
    // url 정보에서 크롤링 한 뒤 앨범 이미지 가져와서 넣어주기
    // url 주소로 앨범커버랑 음원 링크 크롤링
    var music_data = JSON.parse(localStorage.getItem('tempdata'));
    var music = document.getElementById("music");
    for (i=0; i < music_data.length; i++) {
    console.log('가수 :', music_data[i]['singer'], '제목 :', music_data[i]['title'], 'url :', music_data[i]['url'])
    // url로 크롤링 1. 앨범커버 2. 음원링크
    // 가져온 데이터 리스트를 돌면서 div 만들기
    
    // 음악 제목 
    const music_title = document.createElement("div"); // div 생성 (제목)
    music_title.setAttribute("class","music_title"); // clss 지정 (제목)
    music_title.innerText = music_data[i]['title']; // div 내용 텍스트 (제목)
    const music_titles = music.appendChild(music_title) // all_tags 안에 tag 추가 (제목)
    

    // 아티스트
    const music_singer = document.createElement("div"); // div 생성 (아티스트)
    music_singer.setAttribute("class","music_singer"); // clss 지정 (아티스트)
    music_singer.innerText = music_data[i]['singer']; // div 내용 텍스트 (아티스트) 
    const music_singers = music.appendChild(music_singer) // all_tags 안에 tag 추가 (아티스트)


    // 유튜브 링크
    const music_url = document.createElement("iframe"); // div 생성 (유튜브링크)
    music_url.setAttribute("class","music_url"); // clss 지정 (유튜브링크)
    music_url.setAttribute("src",music_data[i]['url']); // clss 지정 (유튜브링크)
    music_url.innerText = music_data[i]['url']; // div 내용 텍스트 (유튜브링크) /// 나중에 삭제 확인용 코드
    const music_urls = music.appendChild(music_url) // all_tags 안에 tag 추가 (유튜브링크)


    }
    

    // var music= document.getElementById("music");
    // music.setAttribute("onclick","MusicDetail(this.innerText)")
    
    // const title = document.createElement("div"); // 곡 이름 div 생성
    // title.setAttribute("class","music_title") // css class 지정
    // title.innerText = data['title']
    // const music = music.appendChild(title)

    // const artist = document.createElement("div"); // 가수 이름 div 생성
    // artist.setAttribute("class","artist_title") // css class 지정
    // artist.innerText = data['artist']
    // const music = music.appendChild(artist)

    // const cover = document.createElement("div"); // 커버이미지 div 생성
    // cover.setAttribute("class","cover_title") // css class 지정
    // cover.setAttribute("onclick","MusicDetail(data['artist'])") // 선택한 버튼 클릭 시 해당 함수 호출
    // const music = music.appendChild(cover)

    // const link = document.createElement("button"); // 음원 링크 버튼 생성
    // link.setAttribute("onclick",data['link'])
    // link.innerText = "음원듣기"
    // const music = music.appendChild(link)
    

    // 검색 결과 도출 시 곡명, 가수이름, "곡 상세페이지 링크 받기"
    // 상세페이지 링크에서 이미지 크롤링해서 프로트로 보내주기
    // 백에서 가수 제목 이미지 음원링크 받기
    // 알아서 넣어주기

    // 검색 시 나오는 페이지도 비슷할 듯

    // / 아니면 미리 만들어둔 id 1번에 넣는방법도 있음 겟으로 가져와서 (그럼 추천 결과가 잘 안나와서 만일 1개라면 오류..)
  
};
