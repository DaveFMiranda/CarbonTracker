// Google Maps API key
// AIzaSyA7CrkqI9weRGAmOEwTvAhi7VMIQ-f-w6Y

// ADD code to establish communication with maps
// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = /* get element by ID start-destination*/;
var destinationA = /* get element by ID end-destination */;
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    // origins: [origin1, origin2],
    origin: [origin2],
    //destinations: [destinationA, destinationB],
    destination: [destinationA],
    travelMode: 'DRIVING',
    // transitOptions: TransitOptions,
    // drivingOptions: DrivingOptions,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    // avoidHighways: Boolean,
    // avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
        if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
      
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var distance = element.distance.text;
              // var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
            }
          }
        }
        consolge.log(distance);
      }


// add code to send maps start and end point

// add code to receive distance

// put the whole thing in an event selector function for the search button

// need to parseint to turn distance into a number for the carbontracker API
// the thing to send to the carbnotracker API is element.distance.text OR the variable distance OR element.distance.value but we need to figure
// out how the value translates to text

// Function to calculate carbon footprint based on start and end destinations
function calculateCarbon() {
    // Get input values from HTML form
    var start = document.getElementById("start-destination").value;
    var end = document.getElementById("end-destination").value;
  
    // Calculate carbon footprint based on start and end destinations
    var carbonFootprint = calculateDistance(start, end) * getCarbonPerMile();
  
    // Display results in HTML
    displayCarbonResults(carbonFootprint);
  }
  
  // Function to calculate distance between two destinations
  function calculateDistance(start, end) {
    // This function would contain the code to calculate the distance between two destinations.
    // The specific code will depend on how you want to calculate distance.
    // For example, you could use a mapping API like Google Maps, or you could use a database of distances between locations.
    // The function should return the distance in miles.
  }
  
  // Function to get carbon emissions per mile
  function getCarbonPerMile() {
    // This function would contain the code to get the carbon emissions per mile.
    // The specific code will depend on the data source for your carbon emissions.
    // For example, you could use a database of carbon emissions per mile for different modes of transportation.
    // The function should return the carbon emissions per mile as a number.
  }
  
  // Function to display carbon footprint results in HTML
  function displayCarbonResults(carbonFootprint) {
    // This function would contain the code to display the carbon footprint results in HTML.
    // You could display the results in a table or list, depending on how you want to present them.
    // For example:
    
    var resultsDiv = document.getElementById("carbon-results");
    
    resultsDiv.innerHTML = "<h2>Carbon Footprint Results</h2>";
    resultsDiv.innerHTML += "<p>Your carbon footprint for this trip is " + carbonFootprint + " pounds of CO2.</p>";
  }
