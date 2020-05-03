let database;

$(document).ready(function () {
    firebaseConfig();
});

function firebaseConfig() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBDpq-t-_hmDosRVAj2eyCNO9O4jAH92AM",
        authDomain: "davidrossetter-3face.firebaseapp.com",
        databaseURL: "https://davidrossetter-3face.firebaseio.com",
        projectId: "davidrossetter-3face",
        storageBucket: "davidrossetter-3face.appspot.com",
        messagingSenderId: "314645915576",
        appId: "1:314645915576:web:316d0bf10235be59d7114d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();

    getAllBlogPosts();

}


function getAllBlogPosts() {
    return new Promise((resolve, reject) => {
        var blogPostsRef = database.ref(`/blogPosts/`);
        blogPostsRef.on("value", function (snapshot) {
            const blogPosts = snapshot.val();
            if (blogPosts) {
                populatePageWithBlogPost(blogPosts[blogPosts.length - 1])
            }
            resolve(blogPosts);
        });
    });
}

function populatePageWithBlogPost(blogPost) {
    console.log("populating page with blog post");
    console.log(blogPost);
    $("#post-name").text(blogPost.postName);
    $("#post-topic").text(blogPost.postTopic);
    $("#post-body").text(blogPost.postBody);
    $("#post-author").text(blogPost.author);
    $("#post-date").text(formatDate(blogPost.timestamp));

}

function formatDate(dateStr) {
    const d = Date.parse(dateStr);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    return `${da}-${mo}-${ye}`;
}





