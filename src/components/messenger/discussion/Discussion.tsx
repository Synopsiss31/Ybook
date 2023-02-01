/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import Image from 'next/image';
// import './discussion.css';
import Router from 'next/router';
import React, { Component } from 'react';

import style from './discussion.module.css';

interface IDiscussionProps {
  discussion: {
    name: string;
    message: string;
    time: string;
    unreadMessages: number;
    profilePhoto: string;
  };
}

interface IDiscussionState {
  name: string;
  message: string;
  time: string;
  unreadMessages: number;
  profilePhoto: string;
}

class Discussion extends Component<IDiscussionProps, IDiscussionState> {
  constructor(props: IDiscussionProps) {
    super(props);

    this.state = {
      name: this.props.discussion.name,
      message: this.props.discussion.message,
      time: this.props.discussion.time,
      unreadMessages: this.props.discussion.unreadMessages,
      profilePhoto: this.props.discussion.profilePhoto,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleClick = () => {
    Router.push('/discussion');
  };

  render() {
    return (
      <div className="discussion" onClick={this.handleClick}>
        {/* <img src={`../assets/${this.state.profilePhoto}.png`} alt="profile" /> */}
        <Image
          src={require(`../assets/${this.state.profilePhoto}.png`)}
          alt="profile"
          className={style.profilePhoto}
        />
        <div className="nameMessage">
          <div className="name">{this.state.name}</div>
          <div className="message">{this.state.message}</div>
        </div>
        <div className="timeNumber">
          <div className="time">{this.state.time}</div>
          <div className="number">{this.state.unreadMessages}</div>
        </div>
        <style jsx>{`
          .profilePhoto {
            width: 20vw;
            height: 20vw;
            border-radius: 50%;
          }

          .discussion {
            display: flex;
            padding: 2vw 0 2vw 0;
            width: 95%;
            margin: auto;
            align-items: center;
            justify-content: space-between;
          }

          .nameMessage {
            flex-grow: 2;
            padding-left: 3vw;
          }

          .nameMessage .name {
            font-weight: bold;
            font-size: 5.5vw;
          }

          .nameMessage .message {
            font-size: 4.5vw;
            padding-left: 3vw;
          }

          .timeNumber {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }

          .timeNumber .number {
            padding-top: 1vw;
            background-color: #5e8ef7;
            color: white;
            font-weight: bold;
            padding: 1vw 2vw;
            border-radius: 100%;
            margin-top: 2vw;
          }
        `}</style>
      </div>
    );
  }
}

export default Discussion;
