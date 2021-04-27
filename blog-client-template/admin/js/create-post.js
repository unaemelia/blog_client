//Code works in Chrome
//Firefox gives this error: "TypeError: NetworkError when attempting to fetch resource."

window.onload = function createPost() {

    const addPostForm = document.getElementById('create-new-post');
    const createTitle = document.getElementById('create-title');
    const createAuthor = document.getElementById('create-author');
    const createContent = document.getElementById('create-content');
    let output = '';

    const displayPosts = (posts) => {
        posts.forEach(post => {
            output += `
        <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>
                    <a href="./update-post.html?id=${post['_id']}">Update</a>
                    <a href="#" class="delete-post" data-id="${post['_id']}">Delete</a>
                </td>
            <tr>
        `;
        })
    }

    addPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: createTitle.value,
                    author: createAuthor.value,
                    content: createContent.value
                })
            })
                .then(response => response.json())
                .then(data => {
                    const dataArr = [];
                    dataArr.push(data);
                    displayPosts(dataArr);
                })
            window.location.replace('./index.html');
        } catch (error) {
            console.log(error);
        }
    })
}