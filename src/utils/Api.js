class Api {
  constructor( baseUrl, headers ) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    //повторяющийся кот (^˵◕ω◕˵^)(^˵◕ω◕˵^)(^˵◕ω◕˵^)
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  } //getInitialCards()

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  setUserData(data) {
    //{name, about}
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkResponce(res));
  } //setUserData

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkResponce(res));
  } //addCard

  saveAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this._checkResponce(res));
  }

  //этот метод будет вызван в публичной функции index.js deleteCard,
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  addLike(id) {//используется только для проекта mesto
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  removeLike(id) {//используется только для проекта mesto
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then((res) => this._checkResponce(res));
  }

} //Api


const api = new Api("https://mesto.nomoreparties.co/v1/cohort-62", {
  authorization: "d5c4048e-b7e4-4333-b5f6-798b19dce01c",
  "Content-Type": "application/json",
});

export default api;