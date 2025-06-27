class NotFound extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>

      *{
        box-sizing: border-box;
      }

      h1, h2, button {
        font-family: "Nunito Sans", serif;
        font-optical-sizing: auto;
        text-align: center;
        align-items: center;
        color: hsl(197, 71.00%, 13.50%);
      }

      button{

        background-color: hsl(198, 25.30%, 54.30%);
        border-radius: 20px  ;
        border: 2.5px solid rgb(192, 192, 192);
        border-color: black;
        width: 10rem;
        height: 3rem;
      }

      .not-found{
        display: flex;
        flex-direction: column;
        align-items: center;
      }


    </style>

    <section class="not-found">
      <div class="home">
        <div class="title">
          <h1>La página que busca no se ha encontrado</h1>
          <h2>error: 404</h2>
        </div>
        <div class="button">
          <button>Vuelve al inicio</button>
        </div>
        
      </div>
      </section>
    `
  }
}

customElements.define('not-found-component', NotFound)