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
  PieChart, Pie, Cell,  BarChart, Bar, XAxis, YAxis, CartesianAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';



export default class App extends Component {
  state = {
    allEvents: [],
    events: [],
    locations: [],
    currentLocation: '',
    numberOfEvents: 5,
    showWelcomeScreen: undefined
  }

  // componentDidMount() {
  //   this.mounted = true;
  //   getEvents().then((events) => {
  //     if (this.mounted) {
  //       this.setState({allEvents: events, locations: extractLocations(events)});
  //       this.setState({events: events.slice(0,5)});
  //     }
  //   })
  // }

  async componentDidMount() {
      this.mounted = true;
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({ allEvents: events, locations: extractLocations(events), events: events.slice(0,5) });
          }
      });
    }
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

  getDataForBarChart = () => {
    const {locations, allEvents} = this.state;
    const data = locations.map((location)=>{
      const number = allEvents.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  getDataForPieChart = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        
    const data = genres.map((genre) => {
        const value = this.state.allEvents.filter(event => event.summary.split(' ').includes(genre)).length;
        return {name: genre, value}
    });
    return data
  }

  mapGenresToColor = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const colors = ['#2364AA', '#3DA5D9', '#73BFB8', '#FEC601', '#EA7317']
    return genres.map((genre, index) => <Cell key={genre} fill={colors[index]}/>)
  }

  

  render() {

    // if (this.state.showWelcomeScreen === undefined) return <div
    //   className="App" />
      
    return (
      <div className="App">
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}getAccessToken={() => { getAccessToken() }} />
        
        <div className='container' style={{display: this.state.showWelcomeScreen ? 'none' : ''}}>

        
        <div className='filter-container'>
         {!navigator.onLine ? <OfflineAlert text='Application is offline.' /> : ''}
          <img alt='hang logo' className='logo' src={logo}/>
          <NumberOfEvents updateEvents={this.updateEvents}/>
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        </div>
      
      
      <div className='dashboard-container'>
        <h1>Time to hang. Here are your events.</h1>
        <div className='data-vis-wrapper'>
          
        <ResponsiveContainer height={150}>
            <PieChart>
              <Pie data={this.getDataForPieChart()} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                {this.mapGenresToColor()}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer height={300} width={400}>
            <BarChart data={this.getDataForBarChart()}>
              <CartesianAxis />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" />
              <Bar name="number of events" dataKey="number" fill="#FDE74C" />
              <Legend verticalAlign="top" height={36} iconType={'circle'}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
        
        
        <EventList events={this.state.events}/>
        </div>
      </div>
    );

  }
  
}


