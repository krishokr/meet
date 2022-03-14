import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';

import EventList from '../EventList';
import Event from '../Event';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';
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

describe('<App /> integration', () => {

    test('App component passes events prop to EventsList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).prop('events')).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App component passes locations prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).prop('locations')).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get a list of events from the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClick(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    })

    test('get a list of all events if a user selects "See all cities', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length-1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    // test('App component receives a number of events query from NumberOfEvents component', () => {
    //     const AppWrapper = mount(<App />);
    //     const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    //     NumberOfEventsWrapper.find('.number-of-events').simulate('change',  {target: { value: 2}});
    //     const query = NumberOfEventsWrapper.state('query');
    //     expect(NumberOfEventsWrapper.state('query')).toBe(2);
    //     AppWrapper.unmount();
    // });

    test('App component gets correct number of events as specified by user if current events list length >= new length', async () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({events: mockData});
        AppWrapper.instance().updateLength(2);
        expect(AppWrapper.state('events')).toHaveLength(2);
        AppWrapper.unmount();
    });

    test('App component gets spceific number of events specified by the user if current events list length < new length', async () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({events: [mockData[0]]}); 
        await AppWrapper.instance().updateLength(3); 
        expect(AppWrapper.state('events')).toHaveLength(3);
        AppWrapper.unmount();
    });

    test('App component passes the correct number of events to EventList', async () => {
        const AppWrapper = mount(<App />);
        const EventListWrapper = AppWrapper.find(EventList);
        await AppWrapper.setState({events: mockData});
        await AppWrapper.instance().updateLength(2);
        // this is different from AppWrapper.find(..) 
        // console.log(EventListWrapper.prop('events').length);
        // console.log(AppWrapper.state('events').length);
        const events = AppWrapper.state('events').length;
        console.log(events)
        expect(AppWrapper.find(EventList).prop('events')).toHaveLength(events);


        unmount(<App />);

    })


    
});

