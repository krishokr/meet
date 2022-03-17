import React, { Component } from 'react'
import './Styles/Event.css';

export default class Event extends Component {
  state = {
    detailsDisplayed: false
  }

  render() {

    const toggleButtonClickState = () => {
      this.state.detailsDisplayed ? this.setState({detailsDisplayed: false}) : this.setState({detailsDisplayed: true});
    }

    const dateTimeFormat = (string) => {
        const date = new Date(string);
        return date.toDateString();
    }
    
    return (
      <div className='event-card'>
        <div className='title-container'>
            <h2>{this.props.event.summary}</h2>
            <h1>{dateTimeFormat(this.props.event.start.dateTime)}</h1>
            <h2>{this.props.event.location}</h2>
        </div>
        <h1 className="event-details" style={{display: this.state.detailsDisplayed ? "flex" : "none" }}>{this.props.event.description}</h1>
        
        <button onClick={toggleButtonClickState} className='toggle-button'>{this.state.detailsDisplayed ? 'Hide Details' : 'Show Details'}</button>
      </div>
    )
  }
}
