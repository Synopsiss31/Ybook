import React, { Component } from 'react';
// import './calls.css';
import './calls.module.css';
import calls from '../mocks/calls.json';
import Call from '../call/Call';


class Calls extends Component {

    render() {
        return (
            <div className='calls'>
                {
                    calls.map(call => (
                        <Call key={call.name} call={call} />
                    ))
                }
            </div>
        );
    }

};

export default Calls;
