export default class UserInfo {

    #name;
    #job;

    constructor({ title, description }) {
        this.#name = document.querySelector(title);
        this.#job = document.querySelector(description);
    }

    getUserInfo() {
        return {
            title: this.#name.textContent,
            description: this.#job.textContent,
        };
    }

    setUserInfo({ title, description }) {
        this.#name.textContent = title;
        this.#job.textContent = description;
    }
}