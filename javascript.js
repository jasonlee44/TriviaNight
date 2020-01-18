//--------------------Firebase javascript stuff--------------------\\
var firebaseConfig = {
        apiKey: "AIzaSyCYNDNxnGUOAD6g9N1GhpfgbBiq_-O_7BU",
        authDomain: "trivianight-b4745.firebaseapp.com",
        databaseURL: "https://trivianight-b4745.firebaseio.com",
        projectId: "trivianight-b4745",
        storageBucket: "trivianight-b4745.appspot.com",
        messagingSenderId: "985127241790",
        appId: "1:985127241790:web:d36213ec7a7deaf8d8e96f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
            
    // Check to see if you are logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user == null) {
            document.getElementById("welcomeMsg").innerHTML = "Log in with Google";
            return;
        } else {
            userId = user.uid;
            userEmail = user.email // you can also get .displayName, .photoURL, .email
            document.getElementById("uid").innerHTML = userEmail; // display Google uid on page
            document.getElementById("welcomeMsg").innerHTML = "Welcome to Trivia Night";
            firebase.database().ref('users/' + userId + '/userInfo').update({email: userEmail});
            window.location.href = "trivianight.html"
            
        } // end user null check
    }); // end check auth state
    
    // HERE IS THE FUNCTION TO SHOW HOW TO GET USER DATA
    function getData() {
        var userId = document.getElementById("uid").innerHTML;
        firebase.database().ref('/tweets/' + userId).once('value', function(snapshot) {
            console.log(snapshot.val());
        });

    }
        
    // HERE IS THE FUNCTION TO SHOW HOW TO PUSH/ADD NEW USER DATA TO EXISTING DATABASE
    function pushData() {
        var userId = document.getElementById("uid").innerHTML;
        var js_time = Date.now();
        var tweetid = firebase.database().ref('users/' + userId + "/messages").push({tweet: "testing", time: js_time});
    }

    // HERE IS THE FUNCTION TO SHOW HOW TO REMOVE USER DATA FROM EXISTING DATABASE - BE CAREFUL!
    function removeData() {
        var tweetid = firebase.database().ref('tweets/' + userId + "/").remove();
    }
    
    function signin() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function(result) { 
            window.location.replace("fbtest.html"); 
        });
    }

    function signout() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
        location.reload();
        window.location.href = "login_function.html"
    }

//--------------------Front-end javascript stuff--------------------\\
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }