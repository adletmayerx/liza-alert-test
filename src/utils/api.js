class Api {
  constructor(url) {
    this._url = url;
  }

  getNews() {
    return fetch(`${this._url}/newstories.json`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this.checkResult);
  }

  getItemById(id) {
    return fetch(`${this._url}/item/${id}.json`, {}).then(this.checkResult);
  }

  checkResult = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };
}

export const api = new Api("https://hacker-news.firebaseio.com/v0");
