export default class Tile {
    #tileElement
    #x
    #y
    #value

    constructor(tileContainer, value = Math.random() > .5 ? 2 : 4) {
        this.#tileElement = document.createElement("div")
        this.#tileElement.classList.add("tile")             // css styling will effect
        tileContainer.append(this.#tileElement)
        this.value = value
    }

    set value(v) {
        this.#value = v
        this.#tileElement.textContent = v
        const power = Math.log2(v)  // power number will increased by one
        const backgroundLightness = 100 - power * 9     // power get bigger decrease(9%) background ligtness
        this.#tileElement.style.setProperty(
            "--background-lightness",
            `${backgroundLightness}%`
        )
        this.#tileElement.style.setProperty(
            "--text-lightness",
            `${backgroundLightness <= 50 ? 90 : 10}%`
        )
    }

    set x(value) {
        this.#x = value
        this.#tileElement.style.setProperty("--x", value)
    }

    set y(value) {
        this.#y = value
        this.#tileElement.style.setProperty("--y", value)
    }
}