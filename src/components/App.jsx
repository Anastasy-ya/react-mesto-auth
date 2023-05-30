import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { ProtectedRoute } from "./ProtectedRoute";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth";

import PopupWithConfirm from "./PopupWithConfirm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  //cтейты для открытия PopupImage:
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
    _id: ""
  });
  const [isOpenImage, setIsOpenImage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({}); //
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [openInfoTooltip, setOpenInfoTooltip] = useState(false);
  const navigate = useNavigate();
  const [isEntry, setIsEntry] = useState(false); //стейт для инфотула
  const [userMessage, setUserMessage] = useState("");
  const [isOpenConfirmationPopup, setIsOpenConfirmationPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      auth
        .checkToken()
        .then((res) => {
          setIsLoggedIn(true);
          navigate("/", { replace: true });
          setUserEmail(res.data.email);
        })
        .catch(console.error);
    }
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "",_id: "" });
    setIsOpenImage(false);
    setOpenInfoTooltip(false);
    setIsOpenConfirmationPopup(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
    setIsOpenImage(true);
  }
  function handleOpenConfirmationPopup({ _id }) {
    setIsOpenConfirmationPopup(true);
    setSelectedCard({ _id });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserData(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api
      .saveAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }

  //далее все функции, относящие ся к роутингу и авторизации

  function handleRegister({ email, password }) {
    setIsLoading(true);
    auth
      .register({ email, password })
      .then((res) => {
        navigate("/sign-in", { replace: true });
        setIsEntry(true);
        setUserMessage("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsEntry(false);
        setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(() => {
        setOpenInfoTooltip(true);
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .login({ email, password })
      .then((res) => {
        setUserEmail(email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        console.log(err);
        setIsEntry(false);
        setUserMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setOpenInfoTooltip(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function deleteToken() {
    localStorage.removeItem("jwt");
    setUserEmail("");
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser || ""}>
          <Header userEmail={userEmail} deleteToken={deleteToken} />
          <Routes>
            <Route
              path="*" //пользователь вошел на несуществующую страницу
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/sign-up" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  onSubmit={handleRegister}
                  title={"Регистрация"}
                  formName={"sign-up"}
                  buttonName={"Зарегистрироваться"}
                  onclose={closeAllPopups}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path="/sign-in"
              element={
                <Login
                  onSubmit={handleLogin}
                  title={"Вход"}
                  formName={"sign-in"}
                  buttonName={"Войти"}
                  isLoading={isLoading}
                />
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleOpenConfirmationPopup} //удаляет handleCardDelete, а сюда подставим ф-ю открывающую попап
                  onCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <EditProfilePopup //редактирование имени польз
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup //добавление новой карточки
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup //редактирование аватара
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <PopupWithConfirm 
            isOpen={isOpenConfirmationPopup}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            isLoading={isLoading}
          />
          <ImagePopup
            onClose={closeAllPopups}
            isOpen={isOpenImage}
            name={selectedCard.name}
            link={selectedCard.link}
          />
          <InfoTooltip
            isOpen={openInfoTooltip}
            formName={"success"}
            onClose={closeAllPopups}
            isEntry={isEntry}
            userMessage={userMessage}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
