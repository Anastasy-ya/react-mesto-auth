import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import EntryForm from "./EntryForm";

function Register({ title, formName, buttonName, onSubmit }) {
  return (
    <>
      <div className="entry-container content">
        <EntryForm
          onSubmit={onSubmit}
          title={title}
          formName={formName}
          buttonName={buttonName}
        />
        <p className="entry-container__subtitle">
          Уже зарегистрированы?&ensp;
          <Link
            to="/sign-in"
            className="entry-container__subtitle entry-container__subtitle_type_link"
          >
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}

export default Register;
