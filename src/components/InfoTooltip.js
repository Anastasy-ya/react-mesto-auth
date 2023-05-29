import React from "react";
import PopupFrame from "./PopupFrame";
import fail from "../images/fail.svg";
import success from "../images/success.svg";

function InfoTooltip({ isOpen, onClose, formName, isEntry, userMessage }) {
  return (
    <PopupFrame
      formName={formName}
      isOpen={isOpen}
      onClose={onClose}
      content={
        <div className="InfoTooltip__container">
          <img
            className="infoTooltip__image"
            src={isEntry ? success : fail}
            alt={formName}
          />
          <h2 className="infoTooltip__subtitle">{userMessage}</h2>
        </div>
      }
    />
  );
}

export default InfoTooltip;
