import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      formName={"profile-edit"}
      buttonName={"Cохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="form__label">
        <input
          type="text"
          name="name"
          className="form__input"
          placeholder="Вася Пупкин"
          required
          minLength="2"
          maxLength="40"
          id="form__name-input"
          onChange={(e) => handleChangeName(e)}
          value={name || ""}
        />
        <span className="form__input-error form__name-input-error"></span>
      </label>
      <label className="form__label">
        <input
          type="text"
          name="about"
          className="form__input"
          placeholder="Сын маминой подруги"
          required
          minLength="2"
          maxLength="200"
          id="form__about-input"
          onChange={(e) => handleChangeDescription(e)}
          value={description || ""}
        />
        <span className="form__input-error form__about-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
