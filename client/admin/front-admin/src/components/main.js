class Main extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback() {
    await this.render()
  }

render() {
  this.shadow.innerHTML =
  /*html*/`
    <style>
      *{
        box-sizing: border-box;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
      }

      main {
        display: grid;
        grid-template-columns: repeat(1, 3fr 4fr);
        gap: 1.5rem;
      }
    </style>

    <main>
      <slot></slot>
    </main>
    `
  }
}

customElements.define('main-component', Main)