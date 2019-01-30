  // Initialize Firebase
  
  
  
  var config = {
    apiKey: "AIzaSyA-UiP6voDQZuOswlEgijfKD2vFCfg4BIE",
    authDomain: "train-schedule-7ec29.firebaseapp.com",
    databaseURL: "https://train-schedule-7ec29.firebaseio.com",
    storageBucket: "train-schedule-7ec29.appspot.com",
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  // button for adding train info

  $("#add-train-btn").on("click", function(event){


    event.preventDefault();


    //grab user input 

    var tName = $("#train-name-input").val().trim(); 
    var tDestination = $("#destination-input").val().trim(); 
    var tFirstTrain = $("#first-train-input").val().trim(); 
    var tFrequency = $("#frequency-input").val().trim();

    //create local temporary object for holding employee data 

    var newTrain = {
        name: tName, 
        destination: tDestination, 
        first: tFirstTrain, 
        frequency: tFrequency
    }; 


    // upload employee data to the database 

    database.ref().push(newTrain); 

    // log everything to console

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("train successfully added"); 

    //clear all of text boxes

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#first-train-input").val("")
    $("#frequency-input").val("")


  });



  // create firebase event for adding train info to the database and inside the html


  database.ref().on("child_added", function(childSnapshot) {


    console.log(childSnapshot.val()); 

    //store everything into a variable 


    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFirstTrain = childSnapshot.val().first;
    var tFrequency = childSnapshot.val().frequency;



    // var trainFrequency = 30;

    // var trainArrival= tFirstTrain - trainFrequency

    // var trainAway = trainArrival + trainFrequency

    var newRow = $("<tr>").append(

    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFrequency),
    // $("<td>").text(trainArrival),
    // $("<td>").text(empRate),
    $("<td>").text(tFirstTrain)

    ); 

    $("#train-table > tbody").append(newRow);







  });