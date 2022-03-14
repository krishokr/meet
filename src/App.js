import React, {Component} from 'react';
import './Styles/App.css';
import './Styles/nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

export default class App extends Component {
  state = {
    events: [],
    locations: [],
    listLength: ''
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({events, locations: extractLocations(events)});
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = async (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? 
      events : events.filter((event) => event.location === location);
      this.setState({ events: locationEvents });
    });
  }

  updateLength = async (length) => {
    this.setState({listLength: length}, () => {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({events: events.slice(length+1)});
        }
      });
      
    });

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


