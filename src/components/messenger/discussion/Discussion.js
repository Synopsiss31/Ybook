import React, { Component } from 'react';
import Image from 'next/image'
// import './discussion.css';
import style from './discussion.module.css';

class Discussion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.discussion.name,
            message: this.props.discussion.message,
            time: this.props.discussion.time,
            unreadMessages: this.props.discussion.unreadMessages,
            profilePhoto: this.props.discussion.profilePhoto
        }
    }


    render() {
        return (
            <div className="discussion">
                {/* <img src={`../assets/${this.state.profilePhoto}.png`} alt="profile" /> */}
                <Image src={require(`../assets/${this.state.profilePhoto}.png`)} alt="profile" className={style.profilePhoto}/>
                <div className='nameMessage'>
                    <div className='name'>{this.state.name}</div>
                    <div className='message'>{this.state.message}</div>
                </div>
                <div className='timeNumber'>
                    <div className='time'>{this.state.time}</div>
                    <div className='number'>{this.state.unreadMessages}</div>
                </div>
                <style jsx>{`
                .profilePhoto{
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
                    background-color: #5E8EF7;
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

};

export default Discussion;
