import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        
        given('the user hasn’t selected an event.', () => {           
        });
        let EventListWrapper;
        when('the user views a list of events.', () => {
            EventListWrapper = mount(<EventList events={mockData}/>);
        });

        then('the event elements are collapsed.', () => {
            const Events = EventListWrapper.find('.EventList li');

            expect(Events[0].state('detailsDisplayed')).toBe(false);
        });
    });

  
    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the list of events is displayed.', () => {

        });

        when('the user selects an event element.', () => {

        });

        then('the event element is expanded to see the details.', () => {

        });
    });

    

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('the event elements are displayed.', () => {

        });

        when('the user deselects an event element.', () => {

        });

        then('the event element should be hidden to hide its details.', () => {

        });
    });

})