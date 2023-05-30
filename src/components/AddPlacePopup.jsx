import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      formName={"add"}
      buttonName={"Cоздать"}
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
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          id="form__place-input"
          onChange={(e) => handleChangeName(e)}
          value={name || ""}
        />
        <span className="form__input-error form__place-input-error"></span>
      </label>
      <label className="form__label">
        <input
          type="url"
          name="link"
          className="form__input"
          placeholder="Ссылка на картинку"
          required
          id="form__url-input"
          onChange={(e) => handleChangeLink(e)}
          value={link || ""}
        />
        <span className="form__input-error form__url-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
