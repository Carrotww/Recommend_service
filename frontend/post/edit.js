async function editArticle() {
    const current_pk = localStorage.getItem('pk');


    const response = await fetch('http://127.0.0.1:8000/articles/' + current_pk + '/', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json', //데이터 타입은 JSON//
            'Authorization': "Bearer " + localStorage.getItem("access") //로그인시 로컬 저장소에 저장되는 토큰 가져오기//
        },
        body: JSON.stringify(articleData)

    })
    window.location.replace('http://127.0.0.1:8000/frontend/post/list.html') //글 등록이 되고 리스트 화면으로 링크//
}