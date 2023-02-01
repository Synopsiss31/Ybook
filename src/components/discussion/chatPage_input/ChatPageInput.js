import React from 'react';
import style from './chatPageInput.module.css';
class ChatPageInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="chatPageInputMain">
                <button className='optionBut'><i className="fa-solid fa-plus"></i></button>
                <div className='inputEmoji'>
                    <input className='inputMessage' placeholder='Type something' />
                    <button className='emojiBut'><i className="fa-regular fa-face-smile"></i></button>
                </div>
                <div>
                    <button className='cameraMic'><i className="fa-solid fa-microphone"></i></button>
                    <button className='cameraMic'><i className="fa-solid fa-camera"></i></button>
                </div>
                <style jsx>{`
                  .chatPageInputMain {
                    background-color: #5E8EF7;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1vw 1.5vw;
                  }

                  .optionBut {
                    background-color: #6596ff;
                    border: none;
                    /* margin: 1vw 3vw; */
                    border-radius: 50%;
                    padding: 3vw;
                    color: white;
                  }

                  .inputEmoji {
                    flex-grow: 1;
                    /* padding: 3vw; */
                    padding: 1vw;
                    background-color: #6596ff;
                    border-radius: 9vw;
                    margin: 0vw 1vw;
                  }

                  .inputMessage {
                    font-family: 'Sofia Sans', sans-serif;
                    background-color: transparent;
                    border: none;
                    color: white;
                    width: 87%;
                    font-size: 4vw;
                    padding: 2vw 0;
                    margin: 0vw 1vw;
                  }

                  .inputMessage:focus {
                    outline: none;
                  }

                  .inputMessage::placeholder {
                    color: white;
                  }

                  .emojiBut {
                    background-color: transparent;
                    border: none;
                    color: white;
                    font-size: 5vw;
                    padding: 2vw 0;
                  }

                  .cameraMic {
                    color: white;
                    background-color: transparent;
                    border: none;
                    padding: 4vw 2vw;
                    font-size: 5vw;
                  }
                `}</style>
            </div>
        );
    }
};

export default ChatPageInput;