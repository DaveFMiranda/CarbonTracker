//var carbonBaseURL = "https://www.carboninterface.com/api/v1/";
// ^^ this resulted in status code 404 "not found" logged.
var carbonAPIKey = "SBghLVQMlzBnpWbfkjr1Kg";

//estimate for vehicles 
var carbonBaseURL= "https://www.carboninterface.com/api/v1/estimates";


// Set up the request headers
var headers = {
  'Authorization': `Bearer ${carbonAPIKey}`,
  'Content-Type': 'application/json'
};

// Make the GET request to the API
fetch(carbonBaseURL, { headers })
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
