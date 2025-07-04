import { store } from '../../redux/store.js'
import { setFilterQuery } from '../../redux/crud-slice.js'

class BotsFilter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/bots'
    this.tableEndpoint = ''

    document.addEventListener('showFilterModal', this.showFilterModal.bind(this))
  }

  async connectedCallback () {
    await this.render()
  }

  showFilterModal (event) {
    if (event.detail.endpoint === this.endpoint) {
      this.shadow.querySelector('.overlay').classList.add('active')
    }
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
      *{
        box-sizing: border-box;
      }

      .form-element{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }

      .form-inputs{
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .overlay{
        align-items: center;
        background-color: hsl(0, 0%, 0%, 0.7);
        display: flex;
        height: 100vh;
        justify-content: center;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }

      .overlay.active{
        opacity: 1;
        visibility: visible;
      }

      .validate {
        background-color: wheat;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 2rem;
        border: 2px solid;
        border-color: hsl(0, 0%, 0%);
        width: 25%;
      }

      .option-buttons{
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

    </style>

<div class="overlay">
      
    
      <section class="validate">
        <div class="form-body">
          <form>
            <div class="form-inputs">
              <div class="form-element">
                <div class="form-element-label">
                  <label>Plataforma</label>
                </div>
                <div class="form-element-input">
                  <input type="text" placeholder="insert plataform" name="plataform">
                </div>
              </div>
              <div class="form-element">
                <div class="form-element-label">
                  <label>Nombre</label>
                </div>
                <div class="form-element-input">
                  <input type="text" placeholder="complete name" name="name">
                </div>
              </div>
              <div class="form-element">
                <div class="form-element-label">
                  <label>Descripción</label>
                </div>
                <div class="form-element-input">
                  <input type="text" placeholder="insert description" name="description">
                </div>
              </div>
              <div class="form-element">
                <div class="form-element-label">
                  <label>Token</label>
                </div>
                <div class="form-element-input">
                  <input type="text" placeholder="insert token" name="token">
                </div>
              </div>
            </div>
          </form>
        </div>
        <div calss= "notice-info">
          <span>Está seguro que quiere filtrar</span>
        </div>
        <div class="option-buttons">
          <div class="acepted-button">
            <button class="acepted-button">Sí</button>
          </div>
          <div class="denied-button">
            <button>No</button>
          </div> 
        </div> 
      </section>
    </div>
    `

    this.renderButtons()
  }

  renderButtons () {
    const aceptedButton = this.shadow.querySelector('.acepted-button')
    const deniedButton = this.shadow.querySelector('.denied-button')

    aceptedButton.addEventListener('click', async () => {
      const form = this.shadow.querySelector('form')
      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const query = Object.entries(formDataJson).map(([key, value]) => `${key}=${value}`).join('&')

      const filterQuery = {
        endPoint: this.endpoint,
        query
      }

      store.dispatch(setFilterQuery(filterQuery))

      this.shadow.querySelector('.overlay').classList.remove('active')
    })

    deniedButton.addEventListener('click', event => {
      const form = this.shadow.querySelector('form')
      form.reset()

      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }
      const query = Object.entries(formDataJson).map(([key, value]) => `${key}=${value}`).join('&')

      const filterQuery = {
        endPoint: this.endpoint,
        query
      }

      store.dispatch(setFilterQuery(filterQuery))

      this.shadow.querySelector('.overlay').classList.remove('active')
    })
  }
}
customElements.define('bots-filter-component', BotsFilter)
