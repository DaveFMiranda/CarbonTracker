// Pulls user input and turns it into variables to send to Maps
// Two variables have been commented out but could be used to return data for a multi-stop trip
// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = document.getElementById("start-destination");
var destinationA = document.getElementById("end-destination");
var carMake = document.getElementById("car-make");
var carModel = document.getElementById("car-model");
var carYear = document.getElementById("car-year");
var makeMatchFound = false;
var modelMatchFound = false;
var modelNumber = "";
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

function setCar() {
  fetch("https://www.carboninterface.com/api/v1/vehicle_makes", {
    method: "GET",
    headers: {
      Authorization: "Bearer Qx7s1muNYFpoAmHwkVH88Q",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (n = 0; n < data.length; n++) {
        if (data[n].data.attributes.name === carMake.value) {
          makeMatchFound = true;
          var makeID = data[n].data.id;
          fetch(
            "https://www.carboninterface.com/api/v1/vehicle_makes/" +
              makeID +
              "/vehicle_models",
            {
              method: "GET",
              headers: {
                Authorization: "Bearer Qx7s1muNYFpoAmHwkVH88Q",
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              let modelID = "";
              for (p = 0; p < data.length; p++) {
                if (
                  data[p].data.attributes.name === carModel.value &&
                  data[p].data.attributes.year === parseInt(carYear.value)
                ) {
                  modelMatchFound = true;
                  modelID = data[p].data.id;
                  break;
                }
              }
              modelNumber = modelID;
              calculateCarbon();
            })
            .catch((error) => console.error(error));
        }
      }
    })
    .catch((error) => console.error(error));
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
      travelMode: "DRIVING",
      // transitOptions: TransitOptions,
      // drivingOptions: DrivingOptions,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      // avoidHighways: Boolean,
      // avoidTolls: Boolean,
    },
    callback
  );
  // Return data from DMS
  function callback(response, status) {
    statusCheck = response.rows[0].elements[0].status;
    // Error message if user searches for a city that DMS can't find, a city with more than one location, or a non-city
    if (statusCheck == "NOT_FOUND") {
      alert(
        "Distance information is not available. If there is more than one place named " +
          origin2.value +
          " or " +
          destinationA.value +
          ", please be more specific."
      );
    }
    // Error message if user searches for driving distance from, e.g., Australia to Japan
    if (statusCheck == "ZERO_RESULTS") {
      alert("You can't get there from here.");
    }
    // Sets the proper piece of return data to the driving distance between the user-entered from and to fields, var distance
    if (status == "OK") {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      //These for loops would be for multi-stop trips
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          distanceWord = element.distance.text;
          // Removes any commas in the return data so the carbon tracker doesn't get confused and turn commas into decimal points
          distanceNumber = distanceWord.replace(/,/g, "");
          var distance = distanceNumber;
          var duration = element.duration.text;
        }
      }
    }
    carbonAPI(modelNumber, distance, duration, origins, destinations);
  }
}

// Launches the carbontracker, sends it the distance received above
function carbonAPI(model, distance, duration, origins, destinations) {
  fetch("https://www.carboninterface.com/api/v1/estimates", {
    method: "POST",
    headers: {
      Authorization: "Bearer Qx7s1muNYFpoAmHwkVH88Q",
      "Content-Type": "application/json",
    },
    // This could be updated to use different types of transport or unit names
    body: JSON.stringify({
      type: "vehicle",
      distance_unit: "mi",
      distance_value: distance,
      vehicle_model_id: model || "7080745f-2426-41fa-894a-f3151dbfb354",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      carbonOutput = data.data.attributes.carbon_lb;
      // Creates an element to display the result and displays the result
      var output = document.createElement("div");
      output.setAttribute("id", "output");
      output.textContent =
        "Your drive from " +
        origins +
        " to " +
        destinations +
        " will be " +
        distance +
        ", release " +
        carbonOutput +
        " pounds of carbon into the atmosphere, and take " +
        duration +
        ".";
      document.body.appendChild(output);
    })
    .catch((error) => console.error(error));
}

// Stores the carbon output to local storage
function saveToLocalStorage() {
  localStorage.setItem(localStorage.length + 1, carbonOutput);
  clearDisplay();
}

// Clears the displayed results of the most-recently-searched-for trip but keeps local storage intact
function clearDisplay() {
  var clearOutput = document.getElementById("output");
  clearOutput.remove();
}
function clearStorage() {
  var totalResults = document.getElementById("totalResults");
  totalResults.innerHTML = "0 lbs of carbon";
}
//function for sum of total stored
function calculatedTotal() {
  totalCarbonNumber = 0;
  // Creates an array to receive data from local storage
  totalCarbonArray = [];
  // Converts each local storage value to a number and pushes it to the above array
  for (var k = 0; k < localStorage.length; k++) {
    totalCarbonArray.push(parseInt(localStorage.getItem(k + 1)));
  }
  // Puts out the sum of the numbers in the array/local storage
  for (var m = 0; m < totalCarbonArray.length; m++) {
    totalCarbonNumber += totalCarbonArray[m];
  }
}

//displays total sum on screen load
function displayAlways() {
  calculatedTotal();
  var displayCarbon = document.createElement("p");
  displayCarbon.textContent = totalCarbonNumber + " lbs of carbon";
  var totalResults = document.getElementById("totalResults");
  totalResults.innerHTML = "";
  totalResults.appendChild(displayCarbon);
}
displayAlways();

particlesJS("particles-js", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
      },
    },
  },
});
