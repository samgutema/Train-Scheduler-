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
    // var tMinutesAway = childSnapshot.val().minutesAway



    

    //adding clock 
  

    // function updateTime () {
    //     var now = moment();
    //     var timeReadable = now.format("s"); 

    //     tFrequency.textContent = timeReadable;
    //     setInterval(updateTime, 1000);


    // }
    // updateTime()
    

    // var frequencyTimer = tFrequency
    
    //  tFrequency=  moment.HTML5_FMT.TIME
    //  setInterval(frequencyTimer, 1000)


    // var frequencyTimer = moment.unix(tFrequency).format("hh:mm")
    

// // tFrequency = moment.HTML5_FMT.TIME
  
// // setInterval(tFrequency, 1000)

    // var currentTime = moment(tFirstTrain).format("hh:mm")

    var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;



    

    

    
       var minutesAway = tFrequency - tRemainder

       var nextArrival = moment().add(minutesAway, "minutes");
       nextArrival = moment(nextArrival).format("hh:mm A");


//new 
    //   var tFrequency = 3;

      // Time is 3:30 AM
    //   var firstTime = "03:30";
  
    //   // First Time (pushed back 1 year to make sure it comes before current time)
    //   var firstTimeConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
     
  
    //   // Current Time
    //   var currentTime = moment();

    //   currentTime = moment(tFirstTrain).format("hh:mm");
  
    //   // Difference between the times
    //   var diffTime = moment().diff(moment(currentTime), "minutes");
  
    //   // Time apart (remainder)
    //   var tRemainder = diffTime % tFrequency;
  
    //   // Minute Until Train
    //   var tMinutesTillTrain = tFrequency - tRemainder;
  
    //   // Next Train
    //   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    //                 nextTrain=   moment(nextTrain).format("hh:mm A");









    var newRow = $("<tr>").append(

    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFrequency),
    // $("<td>").text(trainArrival),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)


    ); 

    $("#train-table > tbody").append(newRow);







  });









//   $("#add-table-btn").on("click",  function updateTime () {
//         var now = moment();
//         var timeReadable = now.format(moment.HTML5_FMT.TIME); 

//         tFrequency.textContent = timeReadable;
//         setInterval(updateTime, 1000);


//     })
//     updateTime()









  function clockStart() {
    setInterval(function() {
               date = new Date()
               let hour = date.getHours();
               let minutes = date.getMinutes();
               let seconds = date.getSeconds();
               document.getElementById("demo").innerHTML = hour + ":"+ minutes + ":" + seconds;
  }, 1000);
  }


