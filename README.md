# Carbon Tracker
A site that tells you how much carbon you'll produce when you drive from point A to B. It can be used to raise awareness of the impact of your trip on the environment.

Project 1, Group 5 (Yasmeen Nguyen, Dave Miranda, Tommy Ho)

## User Story
As an environmentally-conscious driver, I want to know how much carbon my road trips will produce.

## Description
Carbon Tracker asks a user for the beginning an end point of their road trip. The user enters that information and the site returns the amount of carbon the user will burn on the trip. If the user saves that information, it's added to persistent storage that shows the total for all the trips they've saved, until they clear that total.

![My Image](/assets/carbonTrackerIMG.png)
https://davefmiranda.github.io/CarbonTracker/

## Acceptance Criteria
Given a road trip,
WHEN I enter a starting location and ending location,
THEN the distance is returned.
WHEN the distance is returned,
THEN the distance, duration, and amount of carbon burned for the trip are displayed.
WHEN I save the trip results to the total,
THEN the total carbon burned for all saved trips is updated and displayed.

## Installation
n/a

## Usage
This site can be used to see how much carbon your road trip will produce, and to store the total of carbon produced by all of your road trips.

## Future Development Possibilities
### Additional User Input
- metric vs. imperial measurement
- additional travel modes, e.g., flight or shipping
- multi-leg trips
- additional driving options such as avoid tolls
- input fields for user car year, make, and model for more accurate carbon emissions predictions

### Increased Awareness
- convert pounds of carbon released into a more relatable number, such as number of heat deaths caused
- could add total miles driven to persistent storage output
- a tool to compare carbon produced for the user's planned trip vs. alternatives like walking or public transit

## Credits
This site uses the Font Awesome CSS framework: https://fontawesome.com/v4/.

## License
Please refer to the license in the repo.
