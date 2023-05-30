import React, { useState } from "react";

function EntryForm({ title, formName, buttonName, onSubmit, isLoading }) {
  const [userData, setUserData] = useState({ email: "", password: "" });

  //запишем данные таргета в соответствующие поля userData, неизмененные поля не меняем
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  //отправка данных в ф-ю, сделающую запрос на сервер
  const handleLogin = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <>
      <h2 className="entry-container__heading">{title}</h2>
      {/* noValidate */}
      <form
        className="entry-container__form form"
        name={formName}
        onSubmit={handleLogin}
      >
        <div>
          <label className="form__label">
            <input
              type="text"
              name="email"
              className="form__input form__input_type_black"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
              id="form__email-input"
              onChange={(e) => handleChange(e)}
            />
            <span className="form__input-error form__name-input-error"></span>
          </label>
          <label className="form__label">
            <input
              type="password"
              name="password"
              className="form__input form__input_type_black"
              placeholder="Пароль"
              required
              minLength="2"
              maxLength="200"
              id="form__password-input"
              onChange={(e) => handleChange(e)}
            />
            <span className="form__input-error form__about-input-error"></span>
          </label>
        </div>
        <div>
          <button
            className="entry-container__form-button"
            type="submit"
            aria-label="Register"
          >
            { isLoading ? buttonName + "..." : buttonName }
          </button>
        </div>
      </form>
    </>
  );
}

export default EntryForm;
