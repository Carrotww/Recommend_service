async function deleteArticle() {
    const current_pk = localStorage.getItem('pk');
    const currnet_token = localStorage.getItem('access')

    const response = await fetch('http://121.140.94.38:8000/articles/' + current_pk + '/', {
        headers: {
            'Authorization': 'Bearer ' + currnet_token,
        },
        method: 'DELETE',
    });

    // window.location.replace('http://121.140.94.38:5500/frontend/post/list.html')
    location.href = 'list.html'
}