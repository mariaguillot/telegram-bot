class Logo extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    this.data = []
  }

  async connectedCallback() {
    await this.loadData()
    await this.render()
  }

  loadData() {
    this.data = {
      title: "pedidos",
    }
  }

render() {
  this.shadow.innerHTML =
  /*html*/`
    <style>
      
      *{
        box-sizing: border-box;
      }

      h3{
        text-transform: capitalize;
        font-size: 2.5rem;
        margin: 0;
      }
    </style>

    <div class="logo">
      <h3>${this.data.title}</h3>
    </div>
  `
  }
}

customElements.define('logo-component', Logo)