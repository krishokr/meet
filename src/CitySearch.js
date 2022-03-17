import React, { Component } from 'react';
import './Styles/CitySearch.css';

export default class CitySearch extends Component {

    state = {
        query: '',
        suggestions: [],
        showSuggestions: false
    }


    handleInputChange = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter(location => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({query: value, suggestions});
    }

    handleItemClick = (suggestion) => {
        this.setState({query: suggestion, showSuggestions: false}, () => this.props.updateEvents(this.state.query, undefined));
    }

  render() {
    
    return (
      <div className="CitySearch">
          <input className="city" onFocus={() => { this.setState({ showSuggestions: true }) }} onChange={this.handleInputChange} type="text" placeholder='enter a city' value={this.state.query}/>
          <ul className='suggestions' style={this.state.showSuggestions ? {} : {display: 'none'}}>
              {this.state.suggestions.map(suggestion => <li onClick={() => this.handleItemClick(suggestion)} key={suggestion}>{suggestion}</li>)}
              <li className='allCities' onClick={() => this.handleItemClick('all')} key='all'><b>See all cities</b></li>
          </ul>
      </div>
      
    )
  }
}
