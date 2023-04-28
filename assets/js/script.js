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
              if (!element.distance || !element.distance.text) {
                alert("Distance information is not available");
              }
          
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
              console.log(data);
              console.log(data.data.attributes.carbon_lb);
              carbonOutput = data.data.attributes.carbon_lb;
              // Creates an element to display the result and displays the result
              var output = document.createElement('output');
              output.textContent = 'Pounds of carbon created: ' + carbonOutput;
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
              console.log(totalCarbonArray);
              // Puts out the sum of the numbers in the array/local storage
              for (var m = 0; m < totalCarbonArray.length; m++){
                  totalCarbonNumber += totalCarbonArray[m];
                  console.log(totalCarbonNumber);
                }
              
              // create a field to display total carbon burned (totalCarbonNumber) [this should be hard-coded into the html] Is there a way to have that number load upon page load?
                // html hardcode a clear button that clears local storage with text "Reset total carbon burned" // Clear button onclick.(localStorage.clear())
    
    

        
            })
            .catch(error => console.error(error))
          }
          carbonAPI();
      }
    }