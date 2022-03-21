Feature: Specify the Number of Events

Scenario: When user hasn’t specified a number, 5 is the default number
Given the list of events is displayed.
When the user doesn’t specify the number of events.
Then 5 events are shown.

Scenario: User can change the number of events they want to see.
Given the list of events is displayed.
When the user selects the number of events they want to see.
Then the number of events specified by the user is displayed.