/* eslint-disable global-require */
import Image from 'next/image';
import Router from 'next/router';
import React from 'react';

import ChatPageInput from '../chatPage_input/ChatPageInput';
import ChatPageMessage from '../chatPage_message/chatPageMessage';
import chatPage from '../mocks/chatPage.json';
import messages from '../mocks/messages.json';
import style from './chatPage.module.css';

interface IChatPageProps {
  slot?: string;
}

interface IChatPageState {
  name: string;
  Status: string;
  profilePhoto: string;
}

class ChatPage extends React.Component<IChatPageProps, IChatPageState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      name: chatPage.name,
      Status: chatPage.Status,
      profilePhoto: chatPage.profilePhoto,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleClick = () => {
    Router.push('/messenger');
  };

  render() {
    return (
      <div className="chatPageMain">
        <div className="colorContainer">
          <div className="colorContainerInside">
            <div className="topBar">
              <i
                className="fa-solid fa-chevron-left backIcon"
                onClick={this.handleClick}
              ></i>
              <Image
                src={require(`../assets/1.png`)}
                alt="profile"
                className={style.profilePhoto}
              />
              <div className="nameStatus">
                <span className="name">{this.state.name}</span>
                <span>{this.state.Status}</span>
              </div>
              <div>
                <Image
                  src={require(`../assets/icons/video-call.png`)}
                  alt="video call"
                  className={style.callIcon}
                />
                <Image
                  src={require(`../assets/icons/phone-call.png`)}
                  alt="audio call"
                  className={style.callIcon}
                />
              </div>
            </div>
            <div className="messages">
              {messages.map((message) => (
                <ChatPageMessage key={message.content} message={message} />
              ))}
            </div>
          </div>
        </div>
        <ChatPageInput />
        <style jsx>{`
          /**************MUST ADD THIS SOMEWHERE *****************/
          :root {
            --primary-color: #5e8ef7;
            --light-color: #6596ff;
          }

          .chatPageMain {
            height: 100%;
            font-family: 'Sofia Sans', sans-serif;
          }

          .colorContainer {
            height: 93%;
            background-color: #5e8ef7;
          }

          .colorContainerInside {
            height: 100%;
            background-color: white;
            border-radius: 0 0 11vw 11vw;
          }

          .topBar {
            display: flex;
            padding: 5vw 1vw 5vw 5vw;
            align-items: center;
          }

          .profilePhoto {
            width: 16vw;
            height: 16vw;
            border-radius: 50%;
          }

          .callIcon {
            width: 6vw;
            height: 6vw;
            padding: 0 2vw 0 2vw;
          }

          .nameStatus {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            align-self: flex-start;
            padding: 3vw 0 0 3vw;
            font-size: 4.5vw;
          }

          .backIcon {
            font-size: 7vw;
            color: #5e8ef7;
            padding-right: 3vw;
          }

          .name {
            font-weight: bold;
          }

          .messages {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    );
  }
}

export default ChatPage;
