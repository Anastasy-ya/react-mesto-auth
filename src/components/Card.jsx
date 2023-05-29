import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDislike, onCardDelete }) {
  const { name, link, likes, _id, owner } = card;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button-like ${
    isLiked && "button-like_active"
  }`;
  // console.log(onCardLike);

  return (
    <li className="elements__item">
      <img
        className="elements__image"
        src={link}
        alt={name}
        onClick={() => onCardClick({ name, link })}
      />
      {isOwn && (
        <button
          className="elements__delete"
          type="button"
          aria-label="Delete"
          onClick={() => onCardDelete(card)}
        />
      )}
      {/* <button
          className="elements__delete"
          type="button"
          aria-label="Delete"
           //onClick={handleDeleteClick} 
        ></button> */}
      <div className="elements__die">
        <h2 className="elements__signature">{name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            // className="button-like"
            type="button"
            aria-label="Like"
            onClick={() => onCardLike(card)}
          ></button>
          <span className="form__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
