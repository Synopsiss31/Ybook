/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import Image from 'next/image';
import React, { Component } from 'react';

// import './call.css';
import style from './call.module.css';

interface ICallProps {
  call: {
    name: string;
    time: string;
    day: string;
    profilePhoto: string;

    callType: string;
    missed: boolean;
  };
}

interface ICallState {
  name: string;
  time: string;
  day: string;
  profilePhoto: string;

  callType: string;
  missed: boolean;
}

class Call extends Component<ICallProps, ICallState> {
  constructor(props: ICallProps) {
    super(props);

    this.state = {
      name: this.props.call.name,
      time: this.props.call.time,
      day: this.props.call.day,
      profilePhoto: this.props.call.profilePhoto,
      callType: this.props.call.callType,
      missed: this.props.call.missed,
    };
  }

  render() {
    return (
      <div className="div1">
        <Image
          src={require(`../assets/${this.state.profilePhoto}.png`)}
          alt="profile"
          className={
            this.state.missed ? `${style.missed} ${style.div8}` : style.div8
          }
        />
        <div className="div2">
          <div className="div3">{this.state.name}</div>
          <div className="div4">
            {this.state.missed ? (
              <Image
                src={require(`../assets/icons/missed-call.png`)}
                alt="missed call"
                className={style.icon}
              />
            ) : (
              <Image
                src={require(`../assets/icons/incoming-call.png`)}
                alt="received call"
                className={style.icon2}
              />
            )}

            <div className="div9">
              {this.state.time} , {this.state.day}
            </div>
          </div>
        </div>
        <div className="div5">
          {this.state.callType === 'video' ? (
            <i className="fa-solid fa-video"></i>
          ) : (
            <i className="fa-solid fa-phone"></i>
          )}
        </div>
        <style jsx>{`
          .div8 {
            width: 15vw;
            height: 15vw;
            border-radius: 50%;
          }

          .div1 {
            display: flex;
            padding: 3vw 0;
            width: 95%;
            margin: auto;
            align-items: center;
            justify-content: space-between;
          }

          .div2 {
            flex-grow: 1;
            padding: 0 4vw;
          }

          .div3 {
            font-size: 6vw;
            font-weight: 700;
            padding: 2vw 0;
          }

          .div4 {
            display: flex;
          }

          .div5 {
            display: flex;
            font-size: 5vw;
            color: #5e8ef7;
          }

          .div9 {
            padding: 0 1.7vw;
          }

          .icon {
            width: 4vw;
            height: 4vw;
          }

          .icon2 {
            width: 3vw;
            height: 3vw;
          }

          .missed {
            border: 2px solid red;
          }
        `}</style>
      </div>
    );
  }
}

export default Call;
