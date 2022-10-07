export default class Section {

    #items
    #renderer
    #container

    constructor({ items, renderer }, containerSelector) {
        this.#items = items;
        this.#renderer = renderer;

        this.#container = document.querySelector(containerSelector);
    }

    // публичный метод для рендеринга всех карточек из коробки (в колбеке передается другой публичный метод для добавления в дом дерево)
    renderItems() {
        this.#items.forEach(item => this.#renderer(item));
    }

    // публичный метод для добавления нового элемента в дом дерево
    addItem(item) {
        this.#container.prepend(item);
    }
}
