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

            //fix so the line breaks after each post
            postsHTML += `
                <h3>${post.title}</h3>
                <p>${post.author}</p>
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