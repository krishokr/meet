import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

import EventList from '../EventList';
import Event from '../Event';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {

    let AppWrapper;
    
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test('render a list of events', () => {   
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    })

    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    })

})

describe('<EventList /> component', () => {
    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={mockData}/>);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });
});

