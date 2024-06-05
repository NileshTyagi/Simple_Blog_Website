document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('posts')) {
        loadPosts();
    }
});

function addPost() {
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const content = document.getElementById('content').value;
    
    if (title && date && content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ title, date, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        
        // Redirect to the index page after adding a post
        window.location.href = 'index.html';
    } else {
        alert("Please fill in all fields");
    }
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts');
    
    posts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h2><a href="#">${post.title}</a></h2>
            <p>Posted on ${post.date}</p>
            <p>${post.content}</p>
            <button onclick="deletePost(this)">Delete</button>
        `;
        postsContainer.appendChild(article);
    });
}

function deletePost(button) {
    const article = button.parentElement;
    const title = article.querySelector('h2 a').innerText;
    
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts = posts.filter(post => post.title !== title);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    article.remove();
}
