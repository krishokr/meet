Question 1

	1. As a user, I should be able to show and hide an event’s details so that I can see more information about an event if I’m interested.

	2. As a user, I should be able to specify the number of events so that I can explore all my options.

	3. As a user, I should be able to use the app when offline so that I can see where I should meet up in case I’m in a location that doesn’t have service.

	4. As a user, I should be able to visualize the number of upcoming events in each city so I can make decisions about which cities have the most opportunities for meetups.


Feature 2: Show/Hide Event Details

	Scenario 1: An event element is collapsed by default

		Given the user hasn’t selected an event.
		When the user views a list of events.
		Then the event elements are collapsed.

	Scenario 2: User can expand an event to see its details

		Given the list of events is displayed.
		When the user selects an event element.
		Then the event element is expanded to see the details.
	
	Scenario 3: User can collapse an event to hide its details	
	 	Given the event elements are displayed.
		When the user deselects an event element.
		Then the event element should be hidden to hide its details.


Feature 3: Specify the Number of Events

	Scenario 1: When user hasn’t specified a number, 32 is the default number

		Given the list of events is displayed.
		When the user doesn’t specify the number of events.
		Then 32 events are shown.

	Scenario 2: User can change the number of events they want to see.
		Given the list of events is displayed.
		When the user selects the number of events they want to see.
		Then the number of events specified by the user is displayed.



FEATURE 4: USE THE APP WHEN OFFLINE
	Scenario 1: Show cached data when there’s no internet connection.
		Given the data is cached when there is internet connection.
		When there is no internet connection
		Then the cached data can still be displayed without internet connection.
		
	Scenario 2: Show error when user changes the settings (city, time range).
		Given there is no internet connection.
		When the user changes the settings by city or time range.
		Then an error should be displayed alerting the user there is no internet connection and it is not possible to change the settings.


FEATURE 5: DATA VISUALIZATION
	Scenario 1: Show a chart with the number of upcoming events in each city.

		Given the user is viewing the list of events in the city.
		When the user selects a city.
		Then the chart shows the number of upcoming events in each city.