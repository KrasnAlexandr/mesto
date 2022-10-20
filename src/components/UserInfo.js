export default class UserInfo {

    #name;
    #job;
    #avatar;
    #userId;


    constructor({ title, description, avatar }) {
        this.#name = document.querySelector(title);
        this.#job = document.querySelector(description);
        this.#avatar = document.querySelector(avatar);
    }

    // публичный метод для получения актуалных данных пользователя
    getUserInfo() {
        return {
            title: this.#name.textContent,
            description: this.#job.textContent,
        };
    }

    // публичный метод для изменения данных пользователя
    setUserInfo(userInfo) {
        this.#name.textContent = userInfo.title;
        this.#job.textContent = userInfo.description;
        this.#avatar.src = userInfo.avatar;
        this.#userId = userInfo._id;
    }

    updateUserTextInfo(userInfo) {
        this.#name.textContent = userInfo.title;
        this.#job.textContent = userInfo.description;
    }

    updateUserAvatar(userInfo) {
        this.#avatar.src = userInfo.avatar;
    }

    getUserId() {
        return this.#userId;
    }
}