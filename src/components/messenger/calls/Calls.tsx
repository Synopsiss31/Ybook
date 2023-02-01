/* eslint-disable class-methods-use-this */
// import './calls.css';
import './calls.module.css';

import React, { Component } from 'react';

import Call from '../call/Call';
import calls from '../mocks/calls.json';

class Calls extends Component {
  render() {
    return (
      <div className="calls">
        {calls.map((call) => (
          <Call key={call.name} call={call} />
        ))}
      </div>
    );
  }
}

export default Calls;
