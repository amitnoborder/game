import React from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';

const socket = io();

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finishingTimes: []
    };
  }

  componentDidMount() {
    socket.on('finishing times', finishingTimes => {
      this.setState({ finishingTimes });
    });
  }

  handleStartRace = () => {
    socket.emit('start race');
  };

  render() {
    return (
      <div>
        <button onClick={this.handleStartRace}>Start Race</button>
        {this.state.finishingTimes.map((time, index) => (
          <div key={index}>Horse {index + 1}: {time}ms</div>
        ))}
      </div>
    );
  }
}
export default Game;
// render(<App />, document.getElementById('root'));