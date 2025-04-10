class Menu extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    this.data = []
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
      }

      svg {
        width: 3.5rem;
        fill: hsl(208, 69.20%, 72.00%);
      }

      button{
        all: unset;
        cursor: pointer;
      }
    </style>

    <div class="button-menu">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
      </button>
    </div>
    `
  }
}

customElements.define('menu-component', Menu)
