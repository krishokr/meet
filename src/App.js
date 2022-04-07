import React, {Component} from 'react';
import './Styles/App.css';
import './Styles/nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import logo from './logo.png';
import { OfflineAlert } from './Alert';

export default class App extends Component {
  state = {
    allEvents: [],
    events: [],
    locations: [],
    currentLocation: '',
    numberOfEvents: 5
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({allEvents: events, locations: extractLocations(events)});
        this.setState({events: events.slice(0,5)});
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  _locationIsAll = (eventCount) => {
    this.setState({currentLocation: 'all'});
    if (eventCount) {
      this.setState({numberOfEvents: eventCount});
      const correctNumberOfEvents = this.state.allEvents.slice(0,eventCount);
      return this.setState({events: correctNumberOfEvents});
    }
    const hasNumberOfEvents = this.state.numberOfEvents !== (undefined || null)
    const correctNumberOfEvents = hasNumberOfEvents ? this.state.allEvents.slice(0, this.state.numberOfEvents) : this.state.allEvents;
    return this.setState({events: correctNumberOfEvents});
  }

  _locationSpecified = (location) => {
    this.setState({currentLocation: location});
    const locationEvents = this.state.allEvents.filter((event) => event.location === location);
    const correctNumberOfEvents = locationEvents.slice(0, this.state.numberOfEvents);
    return this.setState({events: correctNumberOfEvents});
  }

  _eventCountSpecified = (eventCount) => {
    this.setState({numberOfEvents: eventCount});
    const hasCurrentLocation = this.state.currentLocation !== '';
    const locationEvents = this.state.allEvents.filter(event => event.location === this.state.currentLocation);
    const correctNumberOfEvents = hasCurrentLocation ? locationEvents.slice(0, eventCount) : this.state.allEvents.slice(0, eventCount);
    return this.setState({events: correctNumberOfEvents});
  }

  updateEvents = async(location, eventCount) => {

    if (location) { 
      const isLocationAll = location === 'all';
      isLocationAll ? this._locationIsAll(eventCount) : this._locationSpecified(location); 
    }
    if (eventCount) {
      const isLocationAll = this.state.currentLocation === 'all';
      isLocationAll ? this._locationIsAll(eventCount) : this._eventCountSpecified(eventCount);
    }
  }

  render() {

    return (
      <div className="App">
        
        <div className='filter-container'>
         {!navigator.onLine ? <OfflineAlert text='Application is offline.' /> : ''}
          <img alt='hang logo' className='logo' src={logo}/>
          <NumberOfEvents updateEvents={this.updateEvents}/>
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        </div>
        
        <EventList events={this.state.events}/>
      </div>
    );

  }
  
}


