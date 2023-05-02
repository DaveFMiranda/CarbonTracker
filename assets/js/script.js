// Pulls user input and turns it into variables to send to Maps
// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = document.getElementById("start-destination");
var destinationA = document.getElementById("end-destination");
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

// Launches call to Maps
function initMap() {
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
  statusCheck = response.rows[0].elements[0].status;
  if (statusCheck == 'NOT_FOUND') {
    alert("Distance information is not available. If there is more than one place named " + origin2.value + " or " + destinationA.value + ", please be more specific.");
  }
  if (statusCheck == "ZERO_RESULTS"){
    alert("You can't get there from here.");
  }
      if (status == 'OK') {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          //These for loops would be for multi-stop trips
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              distanceWord = element.distance.text;
              // Removes any commas in the return data so the carbontracker doesn't get confused and turn commas into decimal points
              distanceNumber = distanceWord.replace(/,/g, "");
              var distance = distanceNumber;
              var duration = element.duration.text;
              console.log(duration);
              var from = origins[i];
              var to = destinations[j];
            }
          }
        }           
        console.log(distance);

        // Launches the carbontracker, sends it the distance received above
        function carbonAPI() {
          fetch('https://www.carboninterface.com/api/v1/estimates', {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer Qx7s1muNYFpoAmHwkVH88Q',
              'Content-Type': 'application/json'
            },
            // This could be updated to use different types of transport, unit names, and makes/models of car
            body: JSON.stringify({
              type: 'vehicle',
              distance_unit: 'mi',              
              distance_value: distance,
              vehicle_model_id: '7268a9b7-17e8-4c8d-acca-57059252afe9'
            })
          })
            .then(response => response.json())
            .then(data => {
              carbonOutput = data.data.attributes.carbon_lb;
              // Creates an element to display the result and displays the result

              var output = document.createElement('div');
              output.setAttribute('id', 'output');
              output.textContent = 'Driving from ' + origins + ' to ' + destinations + ' will release ' + carbonOutput + ' pounds of carbon into the atmosphere.';
              document.body.appendChild(output);
              // Stores the carbon output to local storage
              localStorage.setItem(localStorage.length+1, carbonOutput);
              totalCarbonNumber = 0;
              // Creates an array to receive data from local storage
              totalCarbonArray = [];
              // Converts each local storage value to a number and pushes it to the above array
              for (var k = 0; k < localStorage.length; k++) {
                totalCarbonArray.push(parseInt(localStorage.getItem(k+1)));
              }
              // Puts out the sum of the numbers in the array/local storage
              for (var m = 0; m < totalCarbonArray.length; m++){
                  totalCarbonNumber += totalCarbonArray[m];
                }
                console.log(totalCarbonNumber);
              // Displays the total carbon output
              var outputTotal = document.createElement('div');
              outputTotal.setAttribute('id', 'outputTotal');
              outputTotal.textContent = 'Driving all of the trips you\'ve searched so far would release ' + totalCarbonNumber + ' pounds of carbon into the atmosphere.';
              document.body.appendChild(outputTotal);
            })
            .catch(error => console.error(error))
          }
          carbonAPI();
      }       
    }

var reset = document.getElementById('reset');
reset.addEventListener('click', function(resetButton) {
  var clearOutput = document.getElementById('output');
  clearOutput.remove();
  var clearOutputTotal = document.getElementById('outputTotal');
  clearOutputTotal.remove();
})