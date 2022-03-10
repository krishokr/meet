import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    })

    test('textbox element is rendered', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });

    test('number of events is 32 when there is no query', () => {
        expect(NumberOfEventsWrapper.state('query')).toBe('32');
    });

    test('textbox input is rendered in state properly', () => {
        let query = NumberOfEventsWrapper.state('query');
        expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(query);
    });

    test('state changes as textbox input changes', () => {
        const eventObject = {target: {value: 24}};
        NumberOfEventsWrapper.find('.number-of-events').simulate('change', eventObject);

        let query = NumberOfEventsWrapper.find('.number-of-events').prop('value');
        expect(NumberOfEventsWrapper.state('query')).toBe(query);
    });
    
})