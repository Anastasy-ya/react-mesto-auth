import React from "react";
import usePopupClose from "./hooks/usePopupClose";

function ImagePopup({ onClose, isOpen, name, link }) {
  usePopupClose(isOpen, onClose);

  return (
    <figure
      className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container">
        <button
          className="popup-close-icon popup-close-icon_type_image"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <img src={link} alt={name} className="popup__image" />
        <figcaption className="popup__signature">{name}</figcaption>
      </div>
    </figure>
  );
}

export default ImagePopup;
