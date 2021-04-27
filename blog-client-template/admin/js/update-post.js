window.onload = function () {
    fetchPost();
    submitNewPost();
}

async function fetchPost() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let postId = urlParams.get('id');

    const updateTitle = document.getElementById('update-title');
    const updateAuthor = document.getElementById('update-author');
    const updateContent = document.getElementById('update-content');

    try {
        const res = await fetch('http://localhost:5000/posts/' + postId);
        const post = await res.json();
        console.log(post);

        //prefill form
        updateTitle.value = post.title;
        updateAuthor.value = post.author;
        updateContent.value = post.content;

    } catch (error) {
        console.log(error);
    }
}

function submitNewPost() {
    let postForm = document.getElementById('update-post');
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let postId = urlParams.get('id');

    const updateTitle = document.getElementById('update-title');
    const updateAuthor = document.getElementById('update-author');
    const updateContent = document.getElementById('update-content');

    postForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        try {
            await fetch('http://localhost:5000/posts/' + postId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: updateTitle.value,
                    author: updateAuthor.value,
                    content: updateContent.value
                })
            });

            window.location.replace('./index.html');
        } catch (error) {
            console.log(error);
        }
    })
}