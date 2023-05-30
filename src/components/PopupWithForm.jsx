import React from "react";
import PopupForm from "./PopupFrame";

//является модулем для попапов EditAvatarPopup, EditProfilePopup, AddPlacePopup
function PopupWithForm({
  title,
  formName,
  buttonName,
  isOpen,
  onClose,
  children,
  onSubmit,
  isLoading
}) {

  return (
    <PopupForm
      title={title}
      formName={formName}
      isOpen={isOpen}
      onClose={onClose}
      content={
        <>
          <h2 className="popup__heading">{title}</h2>
          {/* noValidate */}
          <form
            className="popup__form form"
            name={formName}
            onSubmit={onSubmit}
          >
            {children}
            <button className="popup__button" type="submit" aria-label="Save">
              { isLoading ? buttonName + "..." : buttonName}
            </button>
          </form>
        </>
      }
    />
  );
}

export default PopupWithForm;
