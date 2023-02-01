import React, { Component } from 'react';
// import './messageSelection.css';
import './messageSelection.module.css';
class MessageSelection extends Component {

    constructor(props) {
        super(props);
        this.statusClicked = this.statusClicked.bind(this);
    }

    statusClicked(status) {
        // changing the hovered status message
        switch (status) {
            case 1:
                this.props.onChange({ selected: 1, callsPage: false });
                setTimeout(() => {
                    this.props.onChange({ selected: 1, callsPage: false, messagesPage: true });
                }, "1100")
                break;
            case 2:
                this.props.onChange({ selected: 2, messagesPage: false });
                setTimeout(() => {
                    this.props.onChange({ selected: 2, messagesPage: false, callsPage: true });
                }, "1100")
                break;
            default:
                break;
        }

    }

    render() {
        return (
            <div id='messageSelection'>
                <button href="google.com" className='messageSelectionStatus' id={this.props.selected === 1 ? "messageSelectionStatusSelected" : undefined} onClick={() => this.statusClicked(1)}>Messages <span id='numberUnreadTop'>15</span></button>
                <button href="google.com" className='messageSelectionStatus' id={this.props.selected === 2 ? "messageSelectionStatusSelected" : undefined} onClick={() => this.statusClicked(2)}>Calls <span id='numberUnreadTop'>25</span></button>
                <style jsx>{`
     #messageSelection {
      background-color: #f5f5f5;
      height: 50px;
      width: 88%;
      margin: auto;
      border-radius: 10vw;
      display: flex;
      justify-content: space-between;
  }
  
  .messageSelectionStatus {
      text-align: center;
      flex-grow: 1;
      color: #8f8f8f;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10vw;
      font-size: 4vw;
      border: none;
      background-color: transparent;
      font-family: 'Sofia Sans', sans-serif;
  }
  
  #messageSelectionStatusSelected {
      color: white;
      background-color: #5E8EF7;
      background: linear-gradient(to right, #f5f5f5 50%, #5E8EF7 50%);
      background-size: 200% 100%;
      background-position: right;
      transition: all 0.7s ease-out;
  }
  
  #numberUnreadTop {
      background-color: white;
      color: #5E8EF7;
      padding: 1vw 2vw;
      margin-left: 2vw;
      border-radius: 3vw;
      font-weight: bold;
  }
     `}</style>
            </div>
        );
    }
};

export default MessageSelection;