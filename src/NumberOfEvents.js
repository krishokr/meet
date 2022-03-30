import React, { Component } from 'react';
import './Styles/NumberOfEvents.css';
import { ErrorAlert } from './Alert';

export default class NumberOfEvents extends Component {
    state = {
        query: 5,
        infoText: ''
    }

    handleChange = (event) => {
      let value = event.target.value;

      this.setState({query: value}, () => {
        if (value > 32) {
          return this.setState({infoText: 'Please select a number from 1 to 32.'});
        }
        this.setState({infoText: ''})
        return this.props.updateEvents(undefined, this.state.query)     
      });

    }

  render() {

    return (
      <div className='NumberOfEvents-container'>
          <ErrorAlert text={this.state.infoText}/>
          <input placeholder='number of events' type="text" pattern="[0-9]*" className='number-of-events' value={this.state.query} onChange={this.handleChange}/>

      </div>
    )
  }
}
