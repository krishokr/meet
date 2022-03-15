import React, {Component} from 'react';
import './Styles/App.css';
import './Styles/nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

export default class App extends Component {
  state = {
    allEvents: [],
    events: [],
    locations: [],
    numberOfEvents: 3
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

  updateEvents = async (location, eventCount) => {
      if (location) {

        const locationEvents = this.state.allEvents.filter((event) => event.location === location);
        const correctNumberOfEvents = (location === 'all') ? this.state.allEvents : locationEvents.slice(0,this.state.numberOfEvents);
        return this.setState({ events: correctNumberOfEvents });
      }

      if (eventCount) {
        const correctNumberOfEvents = this.state.events.slice(0, eventCount);
        return this.setState({events: correctNumberOfEvents})
      }
      
  }

  updateLength = (length) => {
    return this.setState({numberOfEvents: length}, () => this.updateEvents(undefined, length))
  }


  render() {

    return (
      <div className="App">
        <EventList events={this.state.events}/>
        <NumberOfEvents updateLength={this.updateLength}/>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
      </div>
    );

  }
  
}


