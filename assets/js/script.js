//var carbonBaseURL = "https://www.carboninterface.com/api/v1/";
// ^^ this resulted in status code 404 "not found" logged.
var carbonAPIKey = "SBghLVQMlzBnpWbfkjr1Kg";

//function fetchData(){
 //estimate for vehicles 
var carbonBaseURL= "https://www.carboninterface.com/api/v1/estimates";   

// Set up the request headers
/*var headers = {
  'Authorization': `Bearer ${carbonAPIKey}`,
  'Content-Type': 'application/json'
};

var requestData = {
    // Include the data you want to send in the request
    "distance_value": 100.0,
      "vehicle_make": "toyota",
      "vehicle_model": "corolla",
      "vehicle_year": 2017,
      "distance_unit": "mi"
  };



// Make the GET request to the API
fetch(carbonBaseURL, {
    method: 'POST', headers, body: JSON.stringify(requestData)
 })

    .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed with status code ' + response.status);
    }
  })
  .then(data => {
    // Process the data as needed
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
};
  //call the function to test
  fetchData();*/


  fetch('https://www.carboninterface.com/api/v1/estimates', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer SBghLVQMlzBnpWbfkjr1Kg',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: 'vehicle',
    distance_unit: 'mi',
    distance_value: 100,
    vehicle_model_id: '7268a9b7-17e8-4c8d-acca-57059252afe9'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.attributes);
  })
  .catch(error => console.error(error))
  
