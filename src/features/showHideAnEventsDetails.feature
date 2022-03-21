Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default
Given the user hasn’t selected an event.
When the user views a list of events.
Then the event elements are collapsed.

Scenario: User can expand an event to see its details
Given the list of events is displayed.
When the user selects an event element.
Then the event element is expanded to see the details.

Scenario: User can collapse an event to hide its details	
Given the event elements are displayed
And an event is already selected
When the user deselects an event element.
Then the event element should be hidden to hide its details.
