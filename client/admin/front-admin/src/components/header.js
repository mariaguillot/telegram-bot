class Header extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
      *{
        box-sizing: border-box;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    </style>

    <header>
      <slot></slot>
    </header>
    `
  }
}

customElements.define('header-component', Header)
