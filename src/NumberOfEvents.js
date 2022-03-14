import React, { Component } from 'react'

export default class NumberOfEvents extends Component {
    state = {
        query: 32
    }

    handleChange = (event) => {
      let value = event.target.value
      this.setState({query: value}, () => this.props.updateLength(this.state.query));
    }


  render() {

    return (
      <div className='NumberOfEvents-container'>
          <input type="text" pattern="[0-9]*" className='number-of-events' value={this.state.query} onChange={this.handleChange}/>
      </div>
    )
  }
}
