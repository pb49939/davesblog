const goodEmail = 'pbaldwi3@gmail.com'
const badEmail = "badEmail@gmail.com"
const goodPassword = "password1"
const badPassword = "passwordBad"
let currentUser;
let database;
let nextPostId = 1;

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

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            currentUser = user;
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            console.log("signed in! ")
            console.log("email: " + email)
            console.log("userID: " + uid)
            database = firebase.database();
            daveIsLoggedIn()
        } else {
            daveIsNotLoggedIn()
        }
    });


    //auth(goodEmail, goodPassword);
    //auth(badEmail, badPassword);

}

function signMeIn() {
    const email = $("#emailLogin").val();
    const password = $("#passwordLogin").val();
    auth(email, password);
}

function auth(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage)
        // ...
    });
}

function signOut() {
    firebase.auth().signOut();
}

function getAllBlogPosts() {
    return new Promise((resolve, reject) => {
        var blogPostsRef = database.ref(`/blogPosts/`);
        blogPostsRef.on("value", function (snapshot) {
            const blogPosts = snapshot.val();
            if (blogPosts) {
                nextPostId = blogPosts.length;
            }
            console.log("I got some blog posts");
            console.log(blogPosts);
            resolve(blogPosts);
        });
    });
}

function isDaveLoggedIn() {
    if (currentUser) {
        return true;
    } else {
        return false;
    }

}

function daveIsLoggedIn() {
    getAllBlogPosts();
    $(".not-signed-in").hide();
    $(".signed-in").show();
}

function daveIsNotLoggedIn() {
    $(".not-signed-in").show();
    $(".signed-in").hide();
    $(".add-post").hide();
}

function addNewBlogPost() {
    $(".add-post").show();
}

function submitPostName() {
    $(".post-topic-container").show();
}

function submitPostTopic() {
    $(".post-body-container").show();
}

function submitPost() {

    const currentNextPostId = nextPostId;
    const date = new Date();

    firebase.database().ref('blogPosts/' + nextPostId).set({
        postName: $("#post-name").val(),
        postTopic: $("#post-topic").val(),
        postBody: $("#post-content").val(),
        author: "David C. Rosseter",
        timestamp: date.toString()
    });

    var blogPostsRef = database.ref(`/blogPosts/`);
    blogPostsRef.on("value", function (snapshot) {
        const blogPosts = snapshot.val();
        nextPostId = blogPosts.length;
        console.log(blogPosts);
        if (nextPostId > currentNextPostId) {
            newBlogPostSaved();
        }
    });
}

function newBlogPostSaved() {
    console.log("It was saved!");
    alert("The world will never be the same...");
}




