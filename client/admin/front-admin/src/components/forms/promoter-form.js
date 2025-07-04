import isEqual from 'lodash-es/isEqual'
import { store } from '../../redux/store.js'
import { refreshTable } from '../../redux/crud-slice.js'

class PromotersForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/promoters'
    this.unsubscribe = null
    this.formElementData = null
  }

  connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.formElement.data && currentState.crud.formElement.endPoint === this.endpoint && !isEqual(this.formElementData, currentState.crud.formElement.data)) {
        this.formElementData = currentState.crud.formElement.data
        this.showElement(this.formElementData)
      }

      if (!currentState.crud.formElement.data && currentState.crud.formElement.endPoint === this.endpoint) {
        this.resetForm()
      }
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
      *{
        box-sizing: border-box;
        font-family: "Nunito Sans", sans-serif;
      }

      svg {
        width: 2.5rem;
        fill: hsl(0, 0.00%, 0.00%);
      }

      ul {
        list-style: none;
        margin: 0;
        padding:0;
      }

      li{
        color: white;
        padding:0%;
      }

      button{
        all: unset;
        cursor: pointer;
      }
      .buttons{
        display: flex;
      }

      .form{
        display:flex;
        flex-direction: column;
        gap: 2rem;
      }

      .form-header {
        display:flex;
        justify-content: space-between;
        background-color: hsl(208, 69.20%, 72.00%);
        align-items: center;
        height: 2.75rem;
      }

      .validation-errors{
        display: none;
      }

      .validation-errors.active{
        display: block;
        background-color: hsl(0, 80.00%, 62.70%);
        margin: 1rem 0;
        padding: 1rem;
        position: relative;
      }

      .close-validation-errors{
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: 1rem;
      }

      .form-element{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .form-element-input .error{
        border-color: hsl(0, 80.00%, 62.70%);
      }

      input {
        padding: 0.5rem;
        background-color: white;
        border: none;
        outline: none;
        border-radius: 15px;
        border: 2px solid;
        border-color: hsl(208, 69.20%, 72.00%);
        font-size: 1rem;
        width: 100%;
      }  

      .tooltip {
        position: absolute;
        background-color: #4f46e5;
        color: #ffffff;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        white-space: nowrap;
        transform: translateY(-120%);
        margin-bottom: 0.25rem;
        opacity: 0;
        transition: opacity 0.2s ease;  
        z-index: 10;
      }

      .button {
        position: relative;
      }

      .button:hover .tooltip {
        opacity: 1;
      }

      .form-tabs{
        height: 100%;
      }

      .form-tabs ul{
        display:flex;
        height: 100%;
      }

      .form-tabs ul li{
        align-items: center;
        display: flex;
        padding: 0 1rem;
      }

      .tab{
        cursor: pointer;
        color: hsl(290, 100.00%, 27.60%);
        font-weight: 600;
      }

      .tab.active{
        background-color: hsl(290, 100.00%, 27.60%);
        color: hsl(100, 100%, 100%);
      }

      .tab-content{
        display: none;
      }

      .tab-content.active{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
        gap:1rem;
      }


    </style>
    <div class="form">
      <div class="form-header">
        <div class="form-tabs">
          <ul>
            <li class="tab active" data-tab="general">General</li>
          </ul>
        </div>
        <div class= "buttons">
          <div class="button-clean">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>
            </button>
          </div>
          <div class="button-save">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="form-body">
        <div class="validation-errors">
          <div class="close-validation-errors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cerrar</title><path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" /></svg>
          </div>
          <ul></ul>
        </div>
        <form>
          <input type="hidden" name="id">

          <div class="tab-content active" data-tab="general">
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
                <label>Email</label>
              </div>
              <div class="form-element-input">
                <input type="text" placeholder="complete email" name="email">
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    `

    this.renderButtons()
  }

  renderButtons () {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
      }
    })
    this.shadow.querySelector('.form').addEventListener('click', async event => {
      event.preventDefault()

      if (event.target.closest('.button-save')) {
        const form = this.shadow.querySelector('form')
        const formData = new FormData(form)
        const formDataJson = {}

        for (const [key, value] of formData.entries()) {
          formDataJson[key] = value !== '' ? value : null
        }

        const id = this.shadow.querySelector('[name="id"]').value
        const endpoint = id ? `${this.endpoint}/${id}` : this.endpoint
        const method = id ? 'PUT' : 'POST'
        delete formDataJson.id

        try {
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
          })

          if (!response.ok) {
            throw response
          }

          store.dispatch(refreshTable(this.endpoint))
          this.resetForm()

          document.dispatchEvent(new CustomEvent('notice', {
            detail: {
              message: 'Datos guardados correctamente',
              type: 'success'
            }
          }))
        } catch (error) {
          if (error.status === 422) {
            const data = await error.json()
            this.showValidationErrors(data.message)

            document.dispatchEvent(new CustomEvent('notice', {
              detail: {
                message: 'Hay errores de validación',
                type: 'error'
              }
            }))
          }

          if (error.status === 500) {
            document.dispatchEvent(new CustomEvent('notice', {
              detail: {
                message: 'No se han podido guardar los datos',
                type: 'error'
              }
            }))
          }
        }
      }

      if (event.target.closest('.button-clean')) {
        this.resetForm()
      }

      if (event.target.closest('.tab')) {
        const clickedTab = event.target.closest('.tab')

        this.shadow.querySelector('.tab.active').classList.remove('active')
        clickedTab.classList.add('active')

        this.shadow.querySelector('.tab-content.active').classList.remove('active')
        this.shadow.querySelector(`.tab-content[data-tab='${clickedTab.dataset.tab}']`).classList.add('active')
      }

      if (event.target.closest('.close-validation-errors')) {
        this.closeValidationErrors()
      }
    })
  }

  showElement (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (this.shadow.querySelector(`[name="${key}"]`)) {
        this.shadow.querySelector(`[name="${key}"]`).value = value
      }
    })
  }

  showValidationErrors (errors) {
    this.shadow.querySelector('.validation-errors').classList.add('active')

    const errorsCointainer = this.shadow.querySelector('.validation-errors ul')
    errorsCointainer.innerHTML = ''
    this.shadow.querySelectorAll('.form-element-input>*').forEach(input => input.classList.remove('error'))

    errors.forEach(error => {
      const errorMessage = document.createElement('li')
      errorMessage.textContent = error.message
      errorsCointainer.appendChild(errorMessage)
      this.shadow.querySelector(`.form-element-input [name='${error.path}']`).classList.add('error')
    })
  }

  closeValidationErrors () {
    this.shadow.querySelector('.validation-errors').classList.remove('active')
    this.shadow.querySelectorAll('.form-element-input>*').forEach(input => input.classList.remove('error'))
  }

  resetForm () {
    const form = this.shadow.querySelector('form')
    form.reset()
    this.shadow.querySelector('[name="id"]').value = ''
    this.formElementData = null
    this.closeValidationErrors()
  }
}

customElements.define('promoters-form-component', PromotersForm)
