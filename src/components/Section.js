export default class Section {

    #items;
    #renderer;

    #container;

    constructor({ items, renderer }, containerSelector) {
        this.#items = items;
        this.#renderer = renderer;

        this.#container = document.querySelector(containerSelector);
    }

    // публичный метод для рендеринга всех карточек из коробки (в колбеке передается другой публичный метод для добавления в дом дерево)
    renderItems() {
        this.#items.forEach(item => this.addItem(item));
    }

    // публичный метод для добавления элемента в дом дерево (расширение, для исключения дублирования в index.js)
    addItem(card) {
        const newCard = this.#renderer(card);

        this.#container.prepend(newCard);
    }
}
