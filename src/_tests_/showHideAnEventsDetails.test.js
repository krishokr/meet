import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import Event from '../Event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        
        given('the user hasn’t selected an event.', () => {           
        });

        let EventWrapper;
        when('the user views a list of events.', () => {
            EventWrapper = mount(<Event event={mockData[0]}/>);
        });

        then('the event elements are collapsed.', () => {
            expect(EventWrapper.state('detailsDisplayed')).toEqual(false);
            expect(EventWrapper.find('.event-details').prop('style')).toStrictEqual({"display": "none"});
        });
    });

    

  
    test('User can expand an event to see its details', ({ given, when, then }) => {

        given('the list of events is displayed.', () => {

        });

        let EventWrapper;
        when('the user selects an event element.', () => {
            EventWrapper = shallow(<Event event={mockData[0]}/>);
            EventWrapper.find('.toggle-button').simulate('click');
        });

        then('the event element is expanded to see the details.', () => {
           expect(EventWrapper.state('detailsDisplayed')).toBe(true);
        });
    });

    

    test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
        given('the event elements are displayed', () => {

        });
        let EventWrapper;
        and('an event is already selected', () => {
            EventWrapper = shallow(<Event event={mockData[0]}/>);
            EventWrapper.find('.toggle-button').simulate('click');
        });

        when('the user deselects an event element.', () => {
            EventWrapper.find('.toggle-button').simulate('click');
        });

        then('the event element should be hidden to hide its details.', () => {
            expect(EventWrapper.state('detailsDisplayed')).toBe(false);
        });
    });
})