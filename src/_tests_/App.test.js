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

    test('App component passes events prop to EventsList', async () => {
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
        const allEvents = await getEvents();
        AppWrapper.setState({allEvents});
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClick(selectedCity);
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    })

    test('get a list of all events if a user selects "See all cities', async () => {
        const AppWrapper = mount(<App />);
        const allEvents = await getEvents();
        AppWrapper.setState({allEvents});
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length-1).simulate('click');
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('the number of events as specified by the user is passed to App state numberOfEvents', async() => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const allEvents = await getEvents();
        AppWrapper.setState({allEvents});
        NumberOfEventsWrapper.find('.number-of-events').simulate('change', {target:{value:1}});
        expect(AppWrapper.state('numberOfEvents')).toBe(1)
        AppWrapper.unmount();
    });

    test('App gets the correct number of events in events state based on the numberOfEvents', async () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const allEvents = await getEvents();
        AppWrapper.setState({allEvents});
        NumberOfEventsWrapper.find('.number-of-events').simulate('change', {target:{value: 3}});

        expect(AppWrapper.state('events')).toHaveLength(3);
        AppWrapper.unmount();
    })

    test('App component passes the correct number of events to EventList', () => {
        const AppWrapper = mount(<App />);
        AppWrapper.setState({events: mockData.slice(0, 2)});
        const EventListWrapper = AppWrapper.find(EventList);
        expect(EventListWrapper.prop('events')).toBe(AppWrapper.state('events'));
        AppWrapper.unmount();
    });


    
});

