import style from './comments.module.css';

function Comments() {
  return (
    <>
      <div className={style.comment}>Bonjour voici mon commentaire</div>
      <div className={style.comment}>Bonjour voici mon commentaire</div>
      <div className={style.comment}>Bonjour voici mon commentaire</div>
      <div className={style.comment}>Bonjour voici mon commentaire</div>
    </>
  );
}

export default Comments;
