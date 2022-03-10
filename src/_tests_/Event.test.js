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
        expect(EventWrapper.state('detailsContainerClass')).toBe('hidden');
        expect(EventWrapper.find('.hidden')).toHaveLength(1);
    });

    test('render event details button', () => {
        expect(EventWrapper.state('detailsButtonClass')).toBe('show-details-button');
        expect(EventWrapper.find('.show-details-button')).toHaveLength(1);

        expect(EventWrapper.state('detailsButtonText')).toBe('Show Details');
        expect(EventWrapper.find('.show-details-button').text()).toBe('Show Details');
    });

    test('on .show-details-button click render .hide-details-button', () => {
        EventWrapper.setState({detailsButtonClass: 'show-details-button', detailsButtonText: 'Show Details'}, () => {
            EventWrapper.find('.show-details-button').simulate('click')
        });


        expect(EventWrapper.state('detailsButtonClass')).toBe('hide-details-button');
        expect(EventWrapper.find('.hide-details-button')).toHaveLength(1);

        expect(EventWrapper.state('detailsButtonText')).toBe('Hide Details');
        expect(EventWrapper.find('.hide-details-button').text()).toBe('Hide Details');
    })

    test('on .hide-details-button click render .show-details-button', () => {
        EventWrapper.setState({detailsButtonClass: 'hide-details-button', detailsButtonText: 'Hide Details'}, () => {
            EventWrapper.find('.hide-details-button').simulate('click')
        });
        
        expect(EventWrapper.state('detailsButtonClass')).toBe('show-details-button');
        expect(EventWrapper.find('.show-details-button')).toHaveLength(1);

        expect(EventWrapper.state('detailsButtonText')).toBe('Show Details');
        expect(EventWrapper.find('.show-details-button').text()).toBe('Show Details');
    });

    test('on .show-details-button click, details container is shown', () => {
        EventWrapper.setState({detailsButtonClass: 'show-details-button', detailsButtonText: 'Show Details'}, () => {
            EventWrapper.find('.show-details-button').simulate('click')
        });

        expect(EventWrapper.state('detailsContainerClass')).toBe('shown');
        expect(EventWrapper.find('.shown')).toHaveLength(1);
    });

    test('render detail text', () => {
        EventWrapper.setState({detailsButtonClass: 'show-details-button', detailsButtonText: 'Show Details'}, () => {
            EventWrapper.find('.show-details-button').simulate('click')
        });

        let details = event.description;
        expect(EventWrapper.find('.details-text').text()).toBe(details);
    });
    


})