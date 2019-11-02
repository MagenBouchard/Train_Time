

function timeRefresh(timeoutPeriod) {
    setTimeout("location.reload(true);", timeoutPeriod);
};
//database info

var firebaseConfig = {
    apiKey: "AIzaSyBnMhIfMsOeiFPWFW9ZRBF1ws0q_9TfB-c",
    authDomain: "test-project-a38e8.firebaseapp.com",
    databaseURL: "https://test-project-a38e8.firebaseio.com",
    projectId: "test-project-a38e8",
    storageBucket: "test-project-a38e8.appspot.com",
    messagingSenderId: "220231017268",
    appId: "1:220231017268:web:e5d18faa9cd93964a97b61"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database= firebase.database();






//on click and obtain user input
  $("button").on("click", function(){
      event.preventDefault();
      var trainName  =$("#trainName").val().trim();
      var destination =$("#destination").val().trim();
      var trainTime = $("#trainTime").val().trim();
      var frequency = $("#frequency").val().trim();


      console.log(trainName, destination, trainTime, frequency);
//var for database
      var train ={
          trainName: trainName,
          destination: destination,
          trainTime: trainTime,
          frequency: frequency

      };

      database.ref().push(train);
//clean out the inputs
      $("#trainName").val("");
      $("#destination").val("");
      $("#trainTime").val("");
      $("#frequency").val("");
  });

//adding to table from database

  database.ref().on("child_added", function(snapshot){

      var trainName = snapshot.val().trainName; 
      var destination = snapshot.val().destination;
      var trainTime = snapshot.val().trainTime;
      var frequency = snapshot.val().frequency;

    //   console.log(trainName, destination, trainTime, frequency);

//train math yay example!
    let firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    let tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    let tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    if (tMinutesTillTrain === 1){


      var addRow = $("<tr>");
      addRow.addClass("table");
      var newtrainName= $("<td>").text(trainName);
      var newDestination = $("<td>").text(destination); 
      var newtrainTime =$("<td>").text(frequency);
      var newArrival = $("<td>").text(tMinutesTillTrain);
      var newFrequency = $("<td>").text("Arriving NOW!");

      addRow.append(newtrainName);
      addRow.append(newDestination);
      addRow.append(newtrainTime);
      addRow.append(newFrequency);
      addRow.append(newArrival);
      addRow.appendTo("#table");
    
    } else {

        var addRow = $("<tr>");
        addRow.addClass("table");
        var newtrainName= $("<td>").text(trainName);
        var newDestination = $("<td>").text(destination); 
        var newtrainTime =$("<td>").text(frequency);
        var newArrival= $("<td>").text(tMinutesTillTrain);
        var newFrequency = $("<td>").text(nextTrain);
  
        addRow.append(newtrainName);
        addRow.append(newDestination);
        addRow.append(newtrainTime);
        addRow.append(newFrequency);
        addRow.append(newArrival);
        addRow.appendTo("#table");
  
    }

  });






