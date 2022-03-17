import React, { Component } from 'react';
import './Styles/NumberOfEvents.css';

export default class NumberOfEvents extends Component {
    state = {
        query: 5
    }

    handleChange = (event) => {
      let value = event.target.value;
      this.setState({query: value}, () => this.props.updateEvents(undefined, this.state.query));

    }

  render() {

    return (
      <div className='NumberOfEvents-container'>
          <input placeholder='number of events' type="text" pattern="[0-9]*" className='number-of-events' value={this.state.query} onChange={this.handleChange}/>
      </div>
    )
  }
}
