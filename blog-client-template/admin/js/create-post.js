//Error that comes up: google solution
//TypeError: formDataObj is not a function
//{"title":null,"author":null,"content":null}

window.onload = function () {
    createPost();
}

function createPost() {
    const postForm = document.getElementById('create-new-post');
    postForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        console.log(formData);
        let formDataObj = {
            title: formData.get('create-title'),
            author: formData.get('create-author'),
            content: formData.get('create-content')
        }
        console.log(formDataObj);
        console.log(JSON.stringify(formDataObj));

        try {
            await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formDataObj(e.target)
            });
            window.location.replace('./index.html');
        } catch (error) {
            console.log(error);
        }
    });
}