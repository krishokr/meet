import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 5 is the default number', ({ given, when, then }) => {

        let AppWrapper;
        given('the list of events is displayed.', () => {
            AppWrapper = mount(<App />);
        });

        when('the user doesn’t specify the number of events.', () => {

        });

        then('5 events are shown.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(5)
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        let AppWrapper;
        given('the list of events is displayed.', () => {
            AppWrapper = mount(<App />);
        });

        when('the user selects the number of events they want to see.', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.find('.number-of-events').simulate('change', {target: {value: 2}});
        });

        then('the number of events specified by the user is displayed.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(2);
        });
    });
})