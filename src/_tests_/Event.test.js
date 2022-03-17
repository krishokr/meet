import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';
import { mockData } from '../mock-data';
import { extractDetails } from '../api';

describe('<Event /> component', () => {

    let event, EventWrapper;
    
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    });

    test('details are hidden on initial render', () => {
        expect(EventWrapper.state('detailsDisplayed')).toBe(false);
    });

    test('render event details button', () => {
        expect(EventWrapper.state('detailsDisplayed')).toBe(false);
        expect(EventWrapper.find('.toggle-button').text()).toEqual('Show Details');
    });

    test('on initial .toggle-button click render Hide Details', () => {
        EventWrapper.find('.toggle-button').simulate('click');
        expect(EventWrapper.find('.toggle-button').text()).toBe('Hide Details');
    })

    test('when details are displayed, on .toggle-button click render Show Details', () => {
        EventWrapper.setState({detailsDisplayed: true});
        EventWrapper.find('.toggle-button').simulate('click');
        expect(EventWrapper.state('detailsDisplayed')).toBe(false);
        expect(EventWrapper.find('.toggle-button').text()).toBe('Show Details');
    });

    test('on initial render, details are not shown', () => {
        EventWrapper.setState({detailsDisplayed: false});
        expect(EventWrapper.find('.event-details').value('style')).toHaveProperty('display: none');
    });

    test('on initial .toggle-button click, details container is shown', () => {
        EventWrapper.setState({detailsDisplayed: false});
        EventWrapper.find('.toggle-button').simulate('click');
        expect(EventWrapper.find('.event-details').text()).toBeTruthy();
    });
    

})