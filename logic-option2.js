// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC6BmbbNbVvdlA85EO2HV-jxT_xvERkz_U",
    authDomain: "coders-bay-80caf.firebaseapp.com",
    databaseURL: "https://coders-bay-80caf.firebaseio.com",
    storageBucket: "coders-bay-80caf.appspot.com",
  };
  firebase.initializeApp(config);



// Create a variable to reference the database
var database = firebase.database()


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-("

var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// 
// At the initial load, get a snapshot of the current data.
	database.ref().on("value", function(snapshot){


	// If Firebase has a highPrice and highBidder stored (first case)
		if ((snapshot.child("highPrice").exists()) && (snapshot.child("highBidder").exists())){


		// Set the initial variables for highBidder equal to the stored values.
		 highPrice = parseInt(snapshot.val().highPrice);
		 console.log("line 36" + highPrice)
		 highBidder = snapshot.child("highBidder").val();


		// Change the HTML to reflect the initial value
		$('#highestBidder').html(highBidder);
		$('#highestPrice').html(highPrice);


		// Print the initial data to the console.
		console.log(highPrice);
		console.log(highBidder);

		}

	// Else Keep the initial variables for highBidder equal to the initial values
	else {
				$('#highestBidder').html(highBidder);
		$('#highestPrice').html(highPrice);
	}
},
		function (errorObject)  {
	  	console.log("The read failed: " + errorObject.code);
	});



// If any errors are experienced, log them to console. 




// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#submitBid").on('click', function(){



	// Get the input values
	initialBid = $("#bidderPrice").val().trim()
	initialBidder = $("#bidderName").val().trim()

	// Log the Bidder and Price (Even if not the highest)
	console.log(initialBid, initialBidder, highPrice);

	// If Then statements to compare against previous high bidder
	if (initialBid > highPrice){


		// Alert that they are High Bidder
		alert("You have the new highest bid!")

		// Save the new price in Firebase
		database.ref().set({
			highPrice: initialBid,
			highBidder: initialBidder
		})

		// Log the new High Price
		console.log(snapshot.child("highPrice"))
		console.log(snapshot.child("highBidder"))

		// Store the new high price and bidder name as a local variable (could have also used the firebase variable)
		var highPrice = initialBid;
		var highBidder = initialBidder;

		// Change the HTML to reflect the new high price and bidder
		$("#highestBidder").html(highBidder);
		$("#highestPrice").html(highPrice);
	}
	// Else tell user their bid was too low via alert
	else {
		alert("Your bid was too low...")
	}

	// Return False to allow "enter"
	return false;

})