window.onload = () => {
    console.log("recommend.js 로딩완료");
    var payload = JSON.parse(localStorage.getItem('payload')); // 로컬스트리지에 저장된 payload 호출
    var username = payload['username']
    username_element = document.getElementById("username");
    username_element.innerText = username

    recommend_info_fuc()
}

// 추천곡들의 정보를 쿠카에서 불러오는 함수
async function recommend_info_fuc() {
    ////////////////////////////////////////////////////////////////////////// 새로 작업
    append_div = document.getElementById("recommend_container")
    append_div.innerHTML = ""
    var music_data = JSON.parse(localStorage.getItem('tempdata'));
    // 데이터 이름 : 'singer', 'title', 'url', 'youtube_url', 'music_image'
    // var all_music = document.getElementById("all_music");
    // var music = document.getElementById("music");

    music_data.forEach(element => {
            let new_item = document.createElement("div")
            new_item.innerHTML = `<div class="flex-container center">
                <div class="flex-item" id="btn-modal" style="margin: 5px 5px; ">
                    <img src=` + element['music_image'] + `>
                </div>
                <div class="flex-item">` + element['title'] + `</div>
                <div class="flex-item" style="width: 20%; ">` + element['singer'] + `</div>
                <div class="flex-item_like">
                    <input type='checkbox' name='like2' value='like2' id="like2" style="width: 20%;" />
                    <label for="like2" class="mylike">
                        <span class="material-symbols-outlined" id="like2">
                            favorite
                        </span>
                    </label>
                </div>
            </div>`
            append_div.append(new_item)
        })
        /////////////////////////////////////////////////////////////////////////////// 이전 작업

    for (i = 0; i < music_data.length; i++) {
        singer = music_data[i]['singer']
        title = music_data[i]['title']
        url = music_data[i]['url']
        youtube_url = music_data[i]['youtube_url']
        music_image = music_data[i]['music_image']

        const music = document.getElementById("music" + i);
        // 곡 좋아요
        const music_like = document.createElement("input"); // div 생성 (아티스트)
        music_like.setAttribute("type", "checkbox"); // clss 지정 (아티스트)
        music_like.className = "music_like" + i;
        // music_like.setAttribute("id",i); // clss 지정 (아티스트)
        music.appendChild(music_like) // all_tags 안에 tag 추가 (아티스트)

        // 음악 제목 
        const music_title = document.createElement("div"); // div 생성 (제목)
        music_title.setAttribute("class", "music_title"); // clss 지정 (제목)
        music_title.innerText = title; // div 내용 텍스트 (제목)
        music.appendChild(music_title) // all_tags 안에 tag 추가 (제목)

        // 아티스트
        const music_singer = document.createElement("div"); // div 생성 (아티스트)
        music_singer.setAttribute("class", "music_singer"); // clss 지정 (아티스트)
        music_singer.innerText = singer; // div 내용 텍스트 (아티스트) 
        music.appendChild(music_singer) // all_tags 안에 tag 추가 (아티스트)

        // // 곡 상세페이지로 이동하는 버튼
        // const music_info = document.createElement("div"); // div 생성 (유튜브링크)
        // music_info.setAttribute("onclick","location.href="+music_data[i]['url']);
        // music_info.setAttribute("class","music_info"); // clss 지정 (유튜브링크) -> 상세페이지로 넘어가도록
        // music_info.innerText = "곡정보확인"; // div 내용 텍스트 (유튜브링크) /// 나중에 삭제 확인용 코드
        // const music_infos = music.appendChild(music_info) // all_tags 안에 tag 추가 (유튜브링크)
    }
}
// 곡 좋아요 기능 -> 하트아이콘 생성 시 onclick으로 해당 함수 실행
async function music_like_fuc(num) {
    var music = document.getElementById("music_like_" + num);
    music.setAttribute("class", "music_like_fill" + num); // 채워진 하트 스타일로 다시 지정
}
// 모달창
const loremIpsum = document.getElementById("lorem-ipsum")
fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
    .then(response => response.text())
    .then(result => loremIpsum.innerHTML = result)
const modal = document.getElementById("modal")
console.log(modal)

function modalOn() {
    modal.style.display = "flex"
}

function isModalOn() {
    return modal.style.display === "flex"
}

// 모달창 바깥 부분 지정
function modalOff() {
    modal.style.display = "none"
}
// 목록에서 앨범 표지 누르면 모달창 생성
const btnModal = document.getElementById("btn-modal")
btnModal.addEventListener("click", e => {
        modalOn()
    })
    // x 버튼 누르면 모달창 닫침
const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
        modalOff()
    })
    // 모달창 바깥 부분 누르면 모달창 닫침
modal.addEventListener("click", e => {
        const evTarget = e.target
        if (evTarget.classList.contains("modal-overlay")) {
            modalOff()
        }
    })
    // ESC누르면 모달창 닫침
window.addEventListener("keyup", e => {
    if (isModalOn() && e.key === "Escape") {
        modalOff()
    }
})