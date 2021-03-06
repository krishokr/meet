import React, {Component} from 'react';
import './Styles/Alert.css';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }

    render() {
        return (
            <div className='Alert'>
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        )
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#fff';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
    }
}

class OfflineAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#FDE74C';
    }
}

export {InfoAlert, ErrorAlert, OfflineAlert};