import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatar = React.useRef("");

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateAvatar(avatar.current.value);
  }

  React.useEffect(() => {
    avatar.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      formName={"reload-avatar"}
      buttonName={"Cохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="form__label">
        <input
          type="url"
          name="link"
          className="form__input"
          placeholder="Ссылка на картинку"
          required
          id="form__avatar-url-input"
          ref={avatar}
        />
        <span className="form__input-error form__avatar-url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
