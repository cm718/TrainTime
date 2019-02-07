$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDCbMzC5PhUa4TGr83L1bXoSX6VfnUoIwM",
    authDomain: "train-time-e62dc.firebaseapp.com",
    databaseURL: "https://train-time-e62dc.firebaseio.com",
    projectId: "train-time-e62dc",
    storageBucket: "",
    messagingSenderId: "693951186716"
  };

  firebase.initializeApp(config);

  // Set my database variable to the the firebase database
  var database = firebase.database();

  // Create a button for adding Train Times
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grab user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val();
    var frequency = $("#frequency").val();

    // Creates local "temporary" object for holding train data
    var trainData = {
      name: trainName,
      dest: destination,
      time: firstTrainTime,
      freq: frequency
    };

    // Uploads train data to the database
    database.ref().push(trainData);

    // Logs everything to console
    console.log(trainData.name);
    console.log(trainData.dest);
    console.log(trainData.time);
    console.log(trainData.freq);

    // Clears all of the text boxes
    $("#trainName").val("").trim();
    $("#destination").val("").trim();
    $("#firstTrainTime").val("").trim();
    $("#frequency").val("").trim();
  });

  // Create Firebase event for adding train time to the database
  // and a row in the html when the user adds the entry
  database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

    // Store everything into a variable
    var trainName = snapshot.val().name;
    var destination = snapshot.val().dest;
    var firstTrainTime = time;
    var frequency = snapshot.val().freq;
    var nextArrival = moment(traintime).fromNow("HH:mm");
    var minutesAway = moment().format("HH:mm");

    // Log the train information
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
});
