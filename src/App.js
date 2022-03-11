import React, {Component} from 'react';
import './Styles/App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';

export default class App extends Component {
  state = {
    events: [],
    locations: []
  }

  updateEvents = async (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? 
      events : events.filter((event) => event.location === location);
      this.setState({ events: locationEvents });
    });
  }

  render() {

    return (
      <div className="App">
        <EventList events={this.state.events}/>
        <NumberOfEvents />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
      </div>
    );

  }
  
}


