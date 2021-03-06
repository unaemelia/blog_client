window.onload = function () {
    fetchAllPosts();
}

async function fetchAllPosts() {
    try {
        const response = await fetch('http://localhost:5000/posts');
        const posts = await response.json();

        let postsHTML = '';
        for (let post of posts) {
            let date = new Date(post.date);

            postsHTML += `
            <tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td><i>${formatDate(date)}</i></td>
                <td>
                    <a href="./update-post.html?id=${post['_id']}">Update</a>
                    <a href="#" class="delete-post" data-id="${post['_id']}">Delete</a>
                </td>
            <tr>
            `;
        }
        document.getElementById('display-posts').innerHTML = postsHTML;
    } catch (error) {
        console.log(error);
    }
    deleteBlogPosts();
}

function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

function deleteBlogPosts() {
    let deletePosts = document.getElementsByClassName('delete-post');

    for (deletePost of deletePosts) {
        deletePost.addEventListener('click', async function (e) {
            e.preventDefault();

            let clickEvent = e.target;
            let postId = clickEvent.dataset.id;

            try {
                await fetch('http://localhost:5000/posts/' + postId, {
                    method: 'DELETE',
                });
                clickEvent.parentNode.parentNode.remove();
            } catch (error) {
                console.log(error);
            }
        })
    }
}