window.onload = () => {
    console.log("load연결완료")

    show_tag_fuc() // backend에서 tag 가져오기
    alltag = new Array(); // 전체 테그 담을 리스트 선언

}
async function editButton() {
    const current_pk = localStorage.getItem('pk');
    const currnet_token = localStorage.getItem('access')
    fetch('http://121.140.94.38:8000/articles/' + current_pk + '/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', //데이터 타입은 JSON//
            'Authorization': "Bearer " + localStorage.getItem("access") //로그인시 로컬 저장소에 저장되는 토큰 가져오기//
        },
        body: JSON.stringify(articleData)

    })
})