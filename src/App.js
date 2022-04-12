import React, {Component} from 'react';
import './Styles/App.css';
import './Styles/nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import logo from './logo.png';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import {
  PieChart, Pie, Sector, Cell, ScatterChart, Scatter, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './EventGenre';
import EventGenre from './EventGenre';


export default class App extends Component {
  state = {
    allEvents: [],
    events: [],
    locations: [],
    currentLocation: '',
    numberOfEvents: 5,
    showWelcomeScreen: undefined
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

  // async componentDidMount() {
  //     this.mounted = true;
  //     const accessToken = localStorage.getItem('access_token');
  //     const isTokenValid = (await checkToken(accessToken)).error ? false :
  //     true;
  //     const searchParams = new URLSearchParams(window.location.search);
  //     const code = searchParams.get("code");
  //     this.setState({ showWelcomeScreen: !(code || isTokenValid) });
  //     if ((code || isTokenValid) && this.mounted) {
  //       getEvents().then((events) => {
  //         if (this.mounted) {
  //           this.setState({ allEvents: events, locations: extractLocations(events), events: events.slice(0,5) });
  //         }
  //     });
  //   }
  // }

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

  getData = () => {
    const {locations, allEvents} = this.state;
    const data = locations.map((location)=>{
      const number = allEvents.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  

  render() {

    // if (this.state.showWelcomeScreen === undefined) return <div
    //   className="App" />
      
    return (
      <div className="App">
        
        <div className='filter-container'>
         {!navigator.onLine ? <OfflineAlert text='Application is offline.' /> : ''}
          <img alt='hang logo' className='logo' src={logo}/>
          <NumberOfEvents updateEvents={this.updateEvents}/>
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        </div>

        <div className='data-vis-wrapper'>
          <EventGenre events={this.state.allEvents} />

          <ResponsiveContainer height={400}>
            <BarChart data={this.getData()}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Tooltip />
              <Bar dataKey="number" fill="#8884d8" />
            </BarChart>
            {/* <ScatterChart  margin={{ top: 20, right: 20,bottom: 20, left: 20}}> */}
              {/* <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Tooltip /> */}
              {/* <Scatter name="Events" data={this.getData()} fill="#FDE74C" /> */}
            {/* </ScatterChart> */}
          </ResponsiveContainer>
        </div>

        
        
        <EventList events={this.state.events}/>
        {/* <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}getAccessToken={() => { getAccessToken() }} /> */}
      </div>
    );

  }
  
}


