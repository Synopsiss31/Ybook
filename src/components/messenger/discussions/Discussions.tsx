import React, { Component } from 'react';

import Discussion from '../discussion/Discussion';
// import './discussions.css';
import discussions from '../mocks/discussions.json';

interface IDiscussionsProps {}

interface IDiscussionsState {}

class Discussions extends Component<IDiscussionsProps, IDiscussionsState> {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div className="discussions">
        {discussions.map((discussion) => (
          <Discussion key={discussion.name} discussion={discussion as any} />
        ))}
        <style jsx>{`
          .discussions {
            padding-top: 2vw;
          }
        `}</style>
      </div>
    );
  }
}

export default Discussions;
