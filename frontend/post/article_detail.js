async function deleteArticle() {

    const response = await fetch("", {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => console.log(data));
}