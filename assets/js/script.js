// Pulls user input and turns it into variables to send to Maps
// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = document.getElementById("start-destination");
var destinationA = document.getElementById("end-destination");
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

// Launches call to Maps
function initMap() {
  calculateCarbon ();
}

// Set off by clicking the "Calculate Carbon Footprint" button, begins by calling the Distance Matrix service (DMS)
function calculateCarbon() {
var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  //Variables sent to DMS
  {
    // origins: [origin1, origin2],
    origins: [origin2.value],
    //destinations: [destinationA, destinationB],
    destinations: [destinationA.value],
    travelMode: 'DRIVING',
    // transitOptions: TransitOptions,
    // drivingOptions: DrivingOptions,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    // avoidHighways: Boolean,
    // avoidTolls: Boolean,
  }, callback);

// Return data from DMS
function callback(response, status) {
        if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
      
          //These for loops are for multi-stop trips
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              distanceWord = element.distance.text;
              // Removes any commas in the return data so the carbontracker doesn't get confused and turn commas into decimal points
              distanceNumber = distanceWord.replace(/,/g, "");
              var distance = distanceNumber;
              // var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
            }
          }
        }
        console.log(distance);
    }
    function callback(response, status) {
        if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
      
          //These for loops are for multi-stop trips
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              if (element.distance && element.distance.text) {
                // distance text exists
              } else {
                alert("Distance information is not available");
              }
               
              distanceWord = element.distance.text;
              // Removes any commas in the return data so the carbontracker doesn't get confused and turn commas into decimal points
              distanceNumber = distanceWord.replace(/,/g, "");
              var distance = distanceNumber;
              // var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
              // Display an alert message with the calculated distance
                alert("The distance between " + from + " and " + to + " is " + distance + " miles.");

            }
          }
          console.log(distance);
        } else {
          // Handle error status codes
          if (status == 'INVALID_REQUEST') {
            alert("The request was invalid. Please try again.");
          } else if (status == 'MAX_ELEMENTS_EXCEEDED') {
            alert("The product of origins and destinations exceeds the per-query limit. Please try a smaller area.");
          } else if (status == 'OVER_QUERY_LIMIT') {
            alert("The application has exceeded its quota limit. Please try again later.");
          } else if (status == 'REQUEST_DENIED') {
            alert("The request was denied. Please check your API key.");
          } else if (status == 'UNKNOWN_ERROR') {
            alert("An unknown error occurred. Please try again.");
          } else if (status == 'ZERO_RESULTS') {
            alert("No results found for the requested locations.");
          }
        }
    };
  }
  