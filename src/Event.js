import React, { Component } from 'react'
import './Styles/Event.css';

export default class Event extends Component {
  state = {
    detailsButtonClass: 'show-details-button',
    detailsButtonText: 'Show Details',
    detailsContainerClass: 'hidden'
  }

  render() {

    const changeClass = () => {
      if (this.state.detailsButtonClass === 'show-details-button') {
        this.setState({detailsContainerClass: 'shown'});
        return this.setState({detailsButtonClass: 'hide-details-button'});
      }
      return this.setState({detailsButtonClass: 'show-details-button'});
    }

    const changeText = () => {
      if (this.state.detailsButtonText === 'Show Details') {
        return this.setState({detailsButtonText: 'Hide Details'});
      }
      return this.setState({detailsButtonText: 'Show Details'})
    }

    const handleClick= () => {
      changeClass();
      changeText();
    }
    
    return (
      <div>
        <h1>{this.props.event.summary}</h1>
        <h2>{this.props.event.location}</h2>
        <div className={this.state.detailsContainerClass}>
          <h1 className='details-text'>{this.props.event.description}</h1>
        </div>
        <button onClick={handleClick} className={this.state.detailsButtonClass}>{this.state.detailsButtonText}</button>
      </div>
    )
  }
}
