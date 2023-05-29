import React from "react";
import usePopupClose from "./hooks/usePopupClose";

function PopupFrame({ formName, isOpen, onClose, content }) {
  usePopupClose(isOpen, onClose);

  return (
    <>
      <div
        className={`popup popup_type_${formName} ${
          isOpen ? "popup_opened" : ""
        }`}
      >
        <div className="popup__container">
          <button
            className="popup-close-icon"
            type="button"
            aria-label="Close"
            onClick={onClose}
          />
          {content}
        </div>
      </div>
    </>
  );
}

export default PopupFrame;
