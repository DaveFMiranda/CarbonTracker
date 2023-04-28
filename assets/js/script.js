







// Google Maps API key
// AIzaSyA7CrkqI9weRGAmOEwTvAhi7VMIQ-f-w6Y

// ADD code to establish communication with maps
// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = document.getElementById("start-destination");
var destinationA = document.getElementById("end-destination");
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

function initMap() {
  calculateCarbon ();
}

function calculateCarbon() {
var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
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

function callback(response, status) {
        if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
      
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              if (!element.distance || !element.distance.text) {
                alert("Distance information is not available");
              }
              console.log(element.distance.text);
              distanceWord = element.distance.text;
              console.log(distanceWord);
              distanceNumber = distanceWord.replace(/,/g, "");
              console.log(distanceNumber);
              var distance = distanceNumber;
              // var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
            }
          }
        }
        console.log(distance);


        function carbonAPI() {
          fetch('https://www.carboninterface.com/api/v1/estimates', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer Qx7s1muNYFpoAmHwkVH88Q',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'vehicle',
              distance_unit: 'mi',
              // WE NEED TO translate distance result from distance API to carbonAPI distance input format
              
              distance_value: distance,
              vehicle_model_id: '7268a9b7-17e8-4c8d-acca-57059252afe9'
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              console.log(data.data.attributes.carbon_lb);
              carbonOutput = data.data.attributes.carbon_lb;
              console.log(carbonOutput);
              var output = document.createElement('output');

              output.textContent = 'Pounds of carbon created: ' + carbonOutput;
              document.body.appendChild(output);
            })
            .catch(error => console.error(error))



          }
    
          carbonAPI();

      }
      




    }


// add code to send maps start and end point

// add code to receive distance

// put the whole thing in an event selector function for the search button

// need to parseint to turn distance into a number for the carbontracker API
// the thing to send to the carbnotracker API is element.distance.text OR the variable distance OR element.distance.value but we need to figure
// out how the value translates to text

/*

// Function to calculate carbon footprint based on start and end destinations
function calculateCarbon() {



// TOMMY'S START AND END VARIABLES
    // Get input values from HTML form
    /*
    var start = document.getElementById("start-destination").value;
    var end = document.getElementById("end-destination").value;
*/


/*
// HERE WE NEED TO INSERT THE CARBONTRACKER API REQUEST AND RESPONSE
  
    // Calculate carbon footprint based on start and end destinations
    var carbonFootprint = calculateDistance(start, end) * getCarbonPerMile();
  
    // Display results in HTML
    displayCarbonResults(carbonFootprint);
  }
  
  /*
  // Function to calculate distance between two destinations
  function calculateDistance(start, end) {
    // This function would contain the code to calculate the distance between two destinations.
    // The specific code will depend on how you want to calculate distance.
    // For example, you could use a mapping API like Google Maps, or you could use a database of distances between locations.
    // The function should return the distance in miles.
  }
  */
 /*
  // Function to get carbon emissions per mile
  function getCarbonPerMile() {
    // This function would contain the code to get the carbon emissions per mile.
    // The specific code will depend on the data source for your carbon emissions.
    // For example, you could use a database of carbon emissions per mile for different modes of transportation.
    // The function should return the carbon emissions per mile as a number.
  }
  */
 /*
  // Function to display carbon footprint results in HTML
  function displayCarbonResults(carbonFootprint) {
    // This function would contain the code to display the carbon footprint results in HTML.
    // You could display the results in a table or list, depending on how you want to present them.
    // For example:
    
    var resultsDiv = document.getElementById("carbon-results");
    
    resultsDiv.innerHTML = "<h2>Carbon Footprint Results</h2>";
    resultsDiv.innerHTML += "<p>Your carbon footprint for this trip is " + carbonFootprint + " pounds of CO2.</p>";
  } */