export default class UserInfo {

    #name;
    #job;

    constructor({ name, job }) {
        this.#name = document.querySelector(name);
        this.#job = document.querySelector(job);
    }

    getUserInfo() {
        return {
            name: this.#name.textContent,
            info: this.#job.textContent,
        };
    }

    setUserInfo({ name, job }) {
        this.#name.textContent = name;
        this.#job.textContent = job;
    }
}