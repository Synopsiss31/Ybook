import './chatPageMessage.module.css';

import React from 'react';

interface IChatPageMessageProps {
  message: {
    from: string;
    content: string;
    createdAt: string;
  };
}

class ChatPageMessage extends React.Component<IChatPageMessageProps> {
  constructor(props: IChatPageMessageProps | Readonly<IChatPageMessageProps>) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={
          this.props.message.from === 'Mohcine'
            ? 'message myMessage'
            : 'message otherMessage'
        }
      >
        <span className="content">{this.props.message.content}</span>
        <span className="createdAt">{this.props.message.createdAt}</span>
        <style jsx>{`
          .message {
            font-family: 'Sofia Sans', sans-serif;
            display: flex;
            flex-direction: column;
            margin-top: 1vw;
            margin-bottom: 1vw;
            padding: 5vw 4vw 2vw 4vw;
            border-radius: 4vw;
            max-width: 70%;
            width: fit-content;
          }

          .myMessage {
            background-color: #2d6fff;
            color: white;
            align-self: end;
            margin-right: 5vw;
          }

          .otherMessage {
            margin-left: 5vw;
            background-color: #f7f7f7;
          }

          span.content {
            font-size: 5vw;
          }

          .createdAt {
            align-self: end;
            margin-top: 2vw;
          }
        `}</style>
      </div>
    );
  }
}

export default ChatPageMessage;
