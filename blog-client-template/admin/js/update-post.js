window.onload = function () {
    prefillForm();
    updatePost();
}

async function prefillForm() {
    let queryString = window.location.search;
    //console.log(queryString);
    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get('id');
    //console.log(postId);

    try {
        const response = await fetch('http://localhost:5000/posts/' + postId);
        const post = await response.json();
        console.log(post);

        //only content shows up, need to add title and author
        //when I try to update title and author come as null
        document.getElementById('update-title').innerHTML = post.title;
        document.getElementById('update-author').innerHTML = post.author;
        document.getElementById('update-content').innerHTML = post.content;
    } catch (error) {
        console.log(error);
    }
}

function updatePost() {
    let postForm = document.getElementById('update-post');

    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get('id');

    postForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        console.log(postFormToJSON(e.target));

        try {
            await fetch('http://localhost:5000/posts/' + postId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: postFormToJSON(e.target)
            });
            window.location.replace('./index.html');
        } catch (error) {
            console.log(error);
        }
    })
}

function postFormToJSON(form) {
    let obj = {};
    let formData = new FormData(form);

    for (let key of formData.keys()) {
        //console.log(key);
        let inputData = formData.getAll(key);
        //console.log(inputData);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];
        }
    }

    // console.log(obj);
    return JSON.stringify(obj);
}