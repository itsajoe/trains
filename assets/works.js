// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCZe0YaRus25JZ15Mnvg7RFAKgQd8zoTMY",
    authDomain: "classproject-326e1.firebaseapp.com",
    databaseURL: "https://classproject-326e1.firebaseio.com",
    projectId: "classproject-326e1",
    storageBucket: "classproject-326e1.appspot.com",
    messagingSenderId: "480119801997"
  };
  firebase.initializeApp(config);
  var db = firebase.database();
 // var firstTrain;

 $("#submitThis").on("click", function () {
 	var userName = $("#name").val().trim();
 	var thatDestination = $("#destination").val().trim();
 	var firstTrain = $("#first").val().trim();
 	var howOften = $("#frequency").val().trim();
 	$("#name").val("");
 	$("#destination").val("");
 	$("#first").val("");
 	$("#frequency").val("");
 	
	
 
 	db.ref("trains").push({
 		name: userName,
 		destination: thatDestination,
 		frequency: howOften,
 		firstTime: firstTrain
 		// minAway: minAway,
 		// nextTrain: nextTrain

 	});

 });
 


 db.ref("trains").on("child_added", function (snapshot) {
 	var name = snapshot.val().name;
 	var where = snapshot.val().destination;
 	var often = snapshot.val().frequency;
 	var first = snapshot.val().firstTime;
 	// var next = snapshot.val().nextTrain;
 	// var minAway = snapshot.val().minAway;
 	console.log(first);
 	var timeOne = moment(first, "hh:mm").subtract(1, "year");
	console.log(timeOne);
 	var now = moment();
 	var formatted = moment(now, "hh:mm");
 	var difference = moment().diff(moment(timeOne), "minutes");
 	console.log(difference);
 	var mod = difference % often;
 	console.log(mod);
 	var minAway = often - mod;
 	console.log(minAway);
 	var next = moment(formatted).add(minAway, "minutes");
 	console.log(moment(next).format("hh:mm"));
 	var nextTrain = moment(next).format("hh:mm");



 
 	var newRow = $("<tr>");
 	var tr1 = $("<td>").html(name);
 	var tr2 = $("<td>").html(where);
 	var tr3 = $("<td>").html(often);
 	var tr4 = $("<td>").html(minAway);
 	var tr5 = $("<td>").html(nextTrain);
 	newRow.append(tr1);
 	newRow.append(tr2);
 	newRow.append(tr3);
 	newRow.append(tr4);
 	newRow.append(tr5);
 	$("tbody").append(newRow);

 });
 

 