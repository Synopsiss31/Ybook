import Image from "next/image";

import style from "./profile.module.css";

import img from "./profileimg.png";

import Friend from "@mui/icons-material/PeopleAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Publication from "../publication/Publication";
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
        <Publication />
      </div>
    </div>
  );
}

export default Profile;
