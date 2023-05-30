import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          <button onClick={onEditAvatar} className="profile__overlay">
            <img
              className="profile__avatar"
              alt="Аватар профиля"
              src={currentUser.avatar}
            />
          </button>
          <div className="profile__info">
            <div className="profile__info-box">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
                aria-label="Edit"
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="add-button"
          type="button"
          aria-label="Add"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__box">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
