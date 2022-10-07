export default class UserInfo {

    #name;
    #job;

    constructor({ title, description }) {
        this.#name = document.querySelector(title);
        this.#job = document.querySelector(description);
    }

    // публичный метод для получения актуалных данных пользователя
    getUserInfo() {
        return {
            title: this.#name.textContent,
            description: this.#job.textContent,
        };
    }

    // публичный метод для изменения данных пользователя
    setUserInfo({ title, description }) {
        this.#name.textContent = title;
        this.#job.textContent = description;
    }
}