import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import React, { Component } from 'react';

import Calls from '../calls/Calls';
import MessageSelection from '../common/messageSelection/MessageSelection';
import Discussions from '../discussions/Discussions';

interface IMessagesProps {}

interface IMessagesState {
  selected: number;
  messagesPage: boolean;
  callsPage: boolean;
}

class Messages extends Component<IMessagesProps, IMessagesState> {
  messageContainerRef: React.RefObject<unknown>;

  constructor(props: IMessagesProps) {
    super(props);

    this.state = {
      selected: 1,
      messagesPage: true,
      callsPage: false,
    };

    this.messageContainerRef = React.createRef<HTMLDivElement>();
    this.handleChangeMS = this.handleChangeMS.bind(this);
  }

  handleChangeMS(newValue: any) {
    this.setState({
      selected: newValue.selected,
      messagesPage: newValue.messagesPage,
      callsPage: newValue.callsPage,
    });
  }

  render() {
    return (
      <div id="mainComponent">
        <div className="partOne">
          <h1 id="appName">Ybook</h1>
          <div id="partOneOptions">
            <i className="fa-solid fa-magnifying-glass icon"></i>
            <i className="fa-solid fa-ellipsis-vertical icon"></i>
          </div>
        </div>
        <div className="partTwo">
          <MessageSelection
            selected={this.state.selected}
            onChange={this.handleChangeMS}
          />
          <Box
            sx={{
              overflow: 'hidden',
            }}
            ref={this.messageContainerRef}
          >
            <Slide
              direction="down"
              in={this.state.messagesPage}
              mountOnEnter
              unmountOnExit
              // container={this.messageContainerRef.current}
              timeout={1000}
              style={{ backgroundColor: 'white', boxShadow: 'none' }}
            >
              <Paper sx={{ m: 1 }} elevation={0}>
                <Discussions />
              </Paper>
            </Slide>

            <Slide
              direction="down"
              in={this.state.callsPage}
              mountOnEnter
              unmountOnExit
              // container={this.messageContainerRef.current}
              timeout={1000}
              style={{ backgroundColor: 'white', boxShadow: 'none' }}
            >
              <Paper sx={{ m: 1 }} elevation={0}>
                <Calls />
              </Paper>
            </Slide>
          </Box>

          <button className="newChatButton">
            <span>+</span>
            {this.state.selected === 1 ? 'New Chat' : ''}
            {this.state.selected === 2 ? 'New Call' : ''}
          </button>
        </div>
        <style jsx>{`
          #mainComponent {
            background-color: #5e8ef7;
            font-family: 'Sofia Sans', sans-serif;
            height: 100%;
          }

          .partOne {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: white;
            padding-top: 4vw;
          }

          #appName {
            margin: 0;
            padding: 2vw 0 0 6vw;
          }

          .icon {
            font-size: 6vw;
          }

          #partOneOptions {
            display: flex;
            padding: 2vw 6vw 0 0;
            align-items: center;
            justify-content: space-between;
            width: 17vw;
          }

          .partTwo {
            /* height: 1000px; */
            background-color: white;
            border-radius: 15vw 15vw 0 0;
            margin-top: 5vw;
            padding: 5vw 0;
            height: 100%;
          }

          .newChatButton {
            position: fixed;
            bottom: 15vw;
            right: 6vw;
            color: white;
            background-color: #5e8ef7;
            border: none;
            font-size: 4vw;
            font-family: 'Sofia Sans', sans-serif;
            border-radius: 10vw;
            padding: 3vw 5vw;
            display: flex;
            align-items: center;
            text-align: center;
            box-shadow: 4px 4px 9px #999;
          }

          .newChatButton span {
            font-size: 6vw;
            margin-right: 1vw;
          }
        `}</style>
      </div>
    );
  }
}

export default Messages;
