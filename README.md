# CarbonTracker
Enter your start and end points and learn how much carbon you'll burn
Project 1, Group 5 (Yasmeen Nguyen, Dave Miranda, Tommy Ho)

## Acceptance Criteria
Given a road trip,
WHEN I enter a starting location and ending location,
THEN the distance is returned,
WHEN the distance is returned,
THEN the carbon tracker API returns the amount of carbon burned for the trip
// NEED TO ADD STUFF ABOUT THE PERSISTENT DATA. THIS WAS UPDATED 4.27 and only applies to the bare-bones app

## Process
- picked a project: Karaokr
- couldn't find a lyrics API that worked
- redirected to this carbon tracker
- wrote acceptance criteria
- wrote outline and pseudocode of basic functionality
- settled on Google Maps API and the Distance Matrix specifically
    API Key: AIzaSyA7CrkqI9weRGAmOEwTvAhi7VMIQ-f-w6Y
- Used Carbon Interface to return carbon produced
    API Key: Qx7s1muNYFpoAmHwkVH88Q
- established basic user input, API, and output functionality
THIS IS WHERE WE ARE AS OF 4.27 PM

// ADD LINKS TO DOCUMENTATION? NOTE ABOUT HOW THE CARBON API KEY MAY RUN OUT OF USES?

TO DO LIST:
- style the page
- clear previous cities entered
- clear previous output data (add a "clear results" button?)
- add catch.error to the distance matrix API section
- add persistent data so it saves cumulatively and gives you a lifetime number
- error message if there's more than one city with that name
- error message if you hit search without entering input
- 

ICEBOX
    GENERAL
- pretty up the output so there's an already-existing label and box that the return data goes into
    
    CARBON API
- user inputs car make, model and year, carbon API returns vehicle ID, carbon output prediction is more accurate
        BUT WHAT IF THE DATABASE DOESN'T HAVE THE USER'S CAR? SET TO A DEFAULT AVERAGE CAR
- user chooses metric vs. imperial measurements
- lower-priority: convert pounds of carbon into something more relatable like sea-level rise or temp. increase or deaths
    OR! Add a comparison: this is how much it would be with an electric car, OR how much gas it's going to take and how much cheaper it would be with an electric car
- travel mode: could add flight or shipping
    
    DISTANCE API
- could do multi-leg trips
- can change travel mode to transit, walking, biking, Uber/Lyft
- driving options like avoid tolls and such
- could add duration of trip to user output


WE NEED TO ADD THE APP TO OUR PORTFOLIOS FROM CHALLENGE 2!!!


