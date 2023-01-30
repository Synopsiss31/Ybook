import Image from "next/image";

import style from "./profile.module.css";

import img from "./profileimg.png";

import Friend from "@mui/icons-material/PeopleAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
function Profile() {
  return (
    <div className={style.container}>
      <div className={style.profil}>
        <div className={style.profilinfo}>
          <Image className={style.img} src={img} alt="img" />
          <span className={style.username}>Moulay Senouci</span>
          <span className={style.email}>moulay.senouci@ynov.com</span>
        </div>
      </div>
      <div className={style.information}>
        <div className={style.friend}>
          <div className={style.myfriend}>
            <Friend className={style.muicon} />
            <span className={style.title}>Amis</span>
          </div>
          <div className={style.rightfirend}>
            <ArrowForwardIosIcon className={style.muifleche} />
          </div>
        </div>
        <div className={style.account}>
          <div className={style.myaccount}>
            <div className={style.headeraccount}></div>
            <AccountCircleIcon className={style.muicon} />
            <span className={style.title}>Mes informations</span>
          </div>
          <div className={style.rightaccount}>
            <InfoIcon className={style.muiinfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
