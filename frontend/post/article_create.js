function handleArticleCreate() {
    console.log("create")
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value

    postArticles(title, content)
}