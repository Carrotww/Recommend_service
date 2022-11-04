window.onload = ()=>{
    console.log("load")
    show_tag_fuc()
}

async function show_tag_fuc() {

    const response = await fetch('http://210.113.127.22:8000/music/', {
        headers:{
        },
        method:'GET',
    })
    console.log(response.json())
}