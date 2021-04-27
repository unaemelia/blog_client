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
                <h2>${post.title}</h2>
                <h4>${post.author}</h4>
                <i>${formatDate(date)}</i>
                <p>${post.content}</p>
            `;
        }
        document.getElementById('display-blog-posts').innerHTML = postsHTML;
    } catch (error) {
        console.log(error);
    }
}

function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}