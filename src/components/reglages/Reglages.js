import React, { Component } from 'react';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


class Reglages extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }


  }

  render() {
    return (
      <div className='mainComponent'>
        <div className='titleArrow'>
          <i className="fa-solid fa-chevron-left backIcon" onClick={this.handleClick}></i>
          <div className='titleReg'>Reglages</div>
        </div>
        <div className='searchBar'>
          <i className="fa-solid fa-magnifying-glass icon"></i>
          <input placeholder='Chercher un paramétre' />
        </div>

        <div className='options'>
          <div className='option'>
            <i className="fa-solid fa-user optionIcon"></i>
            <div className='optionLabel'>Compte</div>
          </div>
          <div className='option'>
            <i className="fa-solid fa-user-plus optionIcon"></i>
            <div className='optionLabel'>Option d'ajout des amis</div>
          </div>
          <div className='option'>
            <i className="fa-solid fa-bell optionIcon"></i>
            <div className='optionLabel'>Notifications</div>
          </div>
          <div className='option'>
            <i className="fa-solid fa-lock optionIcon"></i>
            <div className='optionLabel'>Changement de mot de passe</div>
          </div>
          <div className='option'>
            <i className="fa-solid fa-palette optionIcon"></i>
            <div className='optionLabel'>Theme</div>
          </div>
          <div className='option red'>
            <i className="fa-solid fa-right-from-bracket optionIcon"></i>
            <div className='optionLabel'>Deconnexion</div>
          </div>
        </div>


        <style jsx>{`
          .options {
            padding: 1vw 8vw
          }
          .option {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 7vw 0;
          }

          .red {
            color: red;
          }

          .optionIcon{
            margin-right: 5vw;
            font-size: 5vw;
          }

          .optionLabel {
            font-size: 6vw
          }


          .mainComponent {
            font-family: 'Sofia Sans', sans-serif;
            padding: 4vw 6vw;
          }
          .titleArrow {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-weight: 800;
          }

          .titleReg{
            margin-left: 5vw;
            font-size: 7vw;
          }

          .searchBar {
            background-color: #e5e5e5;
            padding: 4vw 5vw;
            margin: 5vw 0px;
            border-radius: 5vw;
            box-shadow: #e9e9e9 5px 7px 35px;
          }

          .searchBar input {
            font-family: "Sofia Sans",sans-serif;
            border: none;
            background-color: transparent;
            font-size: 4.5vw;
            margin-left: 5vw;
            font-weight: 700;
          }

          .searchBar input:focus {
            outline: none;
          }
        `}</style>
      </div>

    );
  }

};

export default Reglages;
