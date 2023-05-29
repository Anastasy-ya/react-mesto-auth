import React from "react";
import PopupForm from "./PopupFrame";

function PopupWithForm({
  title,
  formName,
  buttonName,
  isOpen,
  onClose,
  children,
  onSubmit,
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
              {buttonName}
            </button>
          </form>
        </>
      }
    />
  );
}

export default PopupWithForm;
