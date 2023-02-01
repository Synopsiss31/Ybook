import React, { Component } from 'react';
import Discussion from '../discussion/Discussion';
// import './discussions.css';
import discussions from '../mocks/discussions.json';
import style from './discussions.module.css';

class Discussions extends Component {

  render() {
    return (
      <div className='discussions'>
        {
          discussions.map(discussion => (
            <Discussion key={discussion.name} discussion={discussion}/>
          ))
        }
        <style jsx>{`
        .discussions {
            padding-top: 2vw;
        }
        `}</style>
      </div>
    );
  }

};

export default Discussions;
