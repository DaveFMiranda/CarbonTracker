// Pulls user input and turns it into variables to send to Maps
// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = document.getElementById("start-destination");
var destinationA = document.getElementById("end-destination");
var carMake = document.getElementById('car-make');
var carModel = document.getElementById('car-model');
var carYear = document.getElementById('car-year');
var makeMatchFound = false;
var modelMatchFound = false;
var modelID = '15b8e4d8-9ea3-41bd-93df-770fa2c932ef';
console.log(modelID);
// var yearMatchFound = false;
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

function setCar() {
  var storeID;
// makeQueryURL = https://www.carboninterface.com/api/v1/vehicle_makes + api key     
fetch('https://www.carboninterface.com/api/v1/vehicle_makes', {
  method: 'GET',
  headers: {
    "Authorization": 'Bearer Qx7s1muNYFpoAmHwkVH88Q',
    "Content-Type": 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log(data)
  console.log(data[0].data.attributes.name)
  console.log(data[0].data.id)
  console.log(carMake.value)
  for (n = 0; n < data.length; n++) {
    if (data[n].data.attributes.name === carMake.value) {
      makeMatchFound = true;
      var makeID = data[n].data.id;
     // console.log(makeId);

      fetch('https://www.carboninterface.com/api/v1/vehicle_makes/' + makeID + '/vehicle_models', {
        method: 'GET',
        headers: {
          "Authorization": 'Bearer Qx7s1muNYFpoAmHwkVH88Q',
          "Content-Type": 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log(data[0].data.attributes.vehicle_make)
        console.log(data[0].data.attributes.year)
        console.log(data[0].data.attributes.name)
        console.log(data[0].data.id)
        console.log(carYear.value)

        console.log(carModel.value)
        

        for (p = 0; p < data.length; p++) {
          
          if (data[p].data.attributes.name === carModel.value && data[p].data.attributes.year === parseInt(carYear.value)) {
            modelMatchFound = true;
            console.log(data[p].data.id);
            break;
          }
        }
        console.log(data[p].data.id);
        console.log(modelMatchFound);
        console.log(storeID);
        let modelID = data[p].data.id;
        console.log(modelID);
      })
      .catch(error => console.error(error))
      console.log(modelID);




    }
  }
  console.log(makeMatchFound);
  console.log(makeID);
})
.catch(error => console.error(error))




//  IF no data comes back, vehicle_model_id: 1997 toyota corolla, which gets 25 mpg, just under the national average of 25.4


console.log(carMake.value);
console.log(carModel.value);
console.log(carYear.value);

modelID = storeID;
}
console.log(modelID);
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

        
      
       
    
    /*
       

        // then the returned ID goes into...
        GET https://www.carboninterface.com/api/v1/vehicle_make/<vehicle_make_id>/vehicle_models

        THEN GET THE LIST OF MODELS USING:
        curl "https://www.carboninterface.com/api/v1/vehicle_makes/2b1d0cd5-59be-4010-83b3-b60c5e5342da/vehicle_models"
  -H "Authorization: Bearer API_KEY"
  -H "Content-Type: application/json"
  -X GET

        THEN take the data and cycle through to make year and model match user input year and model,
        then that sets the vehicle_model_ID that goes into the carbon API query



        IF no data comes back, vehicle_model_id: 1997 toyota corolla, which gets 25 mpg, just under the national average of 25.4

        */

        // Launches the carbontracker, sends it the distance received above
        function carbonAPI() {
          console.log(modelID);
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
              // REPLACE THIS WITH A VARIABLE
              vehicle_model_id: modelID
            })
          })
            .then(response => response.json())
            .then(data => {
              carbonOutput = data.data.attributes.carbon_lb;
              // Creates an element to display the result and displays the result
              var output = document.createElement('output');
              output.textContent = 'Driving from ' + origins + ' to ' + destinations + ' will release ' + carbonOutput + ' pounds of carbon into the atmosphere and will take you ' + duration + '.';
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
              var outputTotal = document.createElement('outputTotal');
              outputTotal.textContent = 'Driving all of the trips you\'ve searched so far would release ' + totalCarbonNumber + ' pounds of carbon into the atmosphere.';
              document.body.appendChild(outputTotal);
            })
            .catch(error => console.error(error))
          }
          carbonAPI();
      }       
    }