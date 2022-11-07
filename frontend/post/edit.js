window.onload = () => {
    console.log("load연결완료")

    show_tag_fuc() // backend에서 tag 가져오기
    alltag = new Array(); // 전체 테그 담을 리스트 선언

}
async function editButton() {
    fetch('http://121.140.94.38:8000/articles/', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({
            "title": title,
            "content": content
        }),

    })
    console.log(title, content)
        .then((response) => response.json())
        .then((data) => console.log(data));

}