 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBJTrA8rBVBlyIcwejzkd5xAMQMvi9M8u4",
    authDomain: "timesheet-9fbf9.firebaseapp.com",
    databaseURL: "https://timesheet-9fbf9.firebaseio.com",
    projectId: "timesheet-9fbf9",
    storageBucket: "timesheet-9fbf9.appspot.com",
    messagingSenderId: "886091612748"
  };
  firebase.initializeApp(config);

var database = firebase.database()

// Initial values (subjected to change)
var firstName = ""
var lastName = ""
var role = ""
var start = 0
var rate = ""

$("#").on("click", function(event) {
    event.preventDefault()

    // Grabbing value from text box 
    firstName = $("#first-name").val().trim()
    lastName = $("#last-name").val().trim()
    role = $("#role").val().trim()
    start = $("#start-date").val().trim()
    rate = $("#monthly-rate").val().trim()

    database.ref().push({
        firstName: firstName,
        lastName: lastName,
        role: role,
        start: start,
        rate: rate
    })

    console.log(lastName)
})