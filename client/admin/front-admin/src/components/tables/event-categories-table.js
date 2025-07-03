import { store } from '../../redux/store.js'
import { showFormElement } from '../../redux/crud-slice.js'

class EventCategoryTable extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/event-categories'
    this.filterQuery = null
    this.unsubscribe = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.filterQuery.query && currentState.crud.filterQuery.endPoint === this.endpoint) {
        this.filterQuery = currentState.crud.filterQuery.query
        const endpoint = `${this.endpoint}?${currentState.crud.filterQuery.query}`
        this.loadData(endpoint).then(() => this.render())
      }

      if (!currentState.crud.filterQuery.query && currentState.crud.tableEndpoint === this.endpoint) {
        this.loadData().then(() => this.render())
      }
    })

    await this.loadData()
    await this.render()
  }

  async loadData (endpoint = this.endpoint) {
    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }

      this.data = await response.json()
    } catch (error) {
      console.error('Error loading data:', error)
      this.data = []
    }
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
        margin: 0;
        padding: 0;
        list-style: none;
        display:flex;
        flex-direction: column;
      }

      .register ul{
        padding: 1rem;
        padding-left: 2rem;
      }
      

      button{
        all: unset;
        cursor: pointer;
      }

      .table{
        display:flex;
        flex-direction: column;
        gap: 1rem;
        
      }
      
      .header-table{
        background-color: hsl(208, 69.20%, 72.00%);
      }

      .header-body{
        background-color: hsl(208, 69.20%, 72.00%);
        display: flex;
        flex direction: row;
        justify-content: right;
      }

      .info-body{
        background-color: hsl(0, 0%, 0%);
      }

      .body-table{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0 5%;
        padding-bottom: 0.5rem;
        min-height: 75vh;
        max-height: 70vh;
        overflow-y: scroll;
      }

      .body-table::-webkit-scrollbar {
        background-color: black;
        border-radius: 5px;
      }

      .body-table::-webkit-scrollbar-thumb {
        background-color: hsl(208, 69.20%, 72.00%);;
        border-radius: 5px;
      }

      .footer-table {
        align-items: center;
        padding: 0.5rem;
        display: flex;
        justify-content: space-between;
        background-color: hsl(208, 69.20%, 72.00%);
      }

      .pagination{
        display: flex;
        gap: 1rem;
      }

      .pagination-message span{
        color: black;
      }

      .pagination-button{
        color: black;
        cursor: pointer;
        font-size: 3rem;
      }

      .pagination-button.disabled{
        color:rgb(126, 126, 126);
        cursor: not-allowed;
      }
    </style>

    <section class="table">
      <div class="header-table">
        <ul>
          <li>
            <button class="filter-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>filter</title><path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" /></svg>
            </button>
          </li>
        </ul>
      </div>
      <div class="body-table"></div>
      <div class= "footer-table">
        <div class="pagination-message">
          <span>${this.data.meta.total} ${this.data.meta.total > 1 ? 'registros' : 'registro'} en total, mostrando ${this.data.meta.size} por página</span>
        </div>
        <div class="pagination">
          <button class="pagination-button first-page ${this.data.meta.currentPage === 1 ? 'disabled' : ''}" data-page="1">&laquo;</button>
          <button class="pagination-button prev-page ${this.data.meta.currentPage === 1 ? 'disabled' : ''}" data-page="${this.data.meta.currentPage > 1 ? this.data.meta.currentPage - 1 : 1}">&lsaquo;</button>
          <button class="pagination-button next-page ${this.data.meta.currentPage === this.data.meta.pages ? 'disabled' : ''}"  data-page="${this.data.meta.currentPage < this.data.meta.pages ? this.data.meta.currentPage + 1 : this.data.meta.currentPage}">&rsaquo;</button>
          <button class="pagination-button last-page ${this.data.meta.currentPage === this.data.meta.pages ? 'disabled' : ''}" data-page="${this.data.meta.pages}">&raquo;</button>
        </div>
      </div>
    </section>
    `

    const bodyTableContainer = this.shadow.querySelector('.body-table')

    this.data.rows.forEach(element => {
      const register = document.createElement('div')
      register.classList.add('register')
      bodyTableContainer.appendChild(register)

      const headerBodyContainer = document.createElement('div')
      headerBodyContainer.classList.add('header-body')
      register.appendChild(headerBodyContainer)

      const editButton = document.createElement('div')
      editButton.classList.add('edit-button')
      editButton.dataset.id = element.id
      headerBodyContainer.appendChild(editButton)

      const editIcon = document.createElement('button')
      editIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>'
      editButton.appendChild(editIcon)

      const deleteButton = document.createElement('div')
      deleteButton.classList.add('delete-button')
      deleteButton.dataset.id = element.id
      headerBodyContainer.appendChild(deleteButton)

      const deleteIcon = document.createElement('button')
      deleteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
      deleteButton.appendChild(deleteIcon)

      const infoBody = document.createElement('div')
      infoBody.classList.add('info-body')
      register.appendChild(infoBody)

      const infoUl = document.createElement('ul')
      infoBody.appendChild(infoUl)

      let infoLi = document.createElement('li')
      infoLi.textContent = `Nombre: ${element.name}`
      infoUl.appendChild(infoLi)

      infoLi = document.createElement('li')
      infoLi.textContent = `Fecha de creación: ${element.createdAt}`
      infoUl.appendChild(infoLi)

      infoLi = document.createElement('li')
      infoLi.textContent = `Fecha de actualización: ${element.updatedAt}`
      infoUl.appendChild(infoLi)
    })

    this.renderButtons()
  }

  renderButtons () {
    this.shadow.querySelector('.table').addEventListener('click', async event => {
      if (event.target.closest('.edit-button')) {
        const element = event.target.closest('.edit-button')
        const id = element.dataset.id
        const endpoint = `${this.endpoint}/${id}`

        try {
          const response = await fetch(endpoint)

          if (response.status === 500 || response.status === 404) {
            throw response
          }

          const data = await response.json()

          const formElement = {
            endPoint: this.endpoint,
            data
          }

          store.dispatch(showFormElement(formElement))
        } catch (error) {
          document.dispatchEvent(new CustomEvent('notice', {
            detail: {
              message: 'No se han podido recuperar el dato',
              type: 'error'
            }
          }))
        }
      }

      if (event.target.closest('.delete-button')) {
        const element = event.target.closest('.delete-button')
        const id = element.dataset.id
        document.dispatchEvent(new CustomEvent('showDeleteModal', {

          detail: {
            endpoint: this.endpoint,
            elementId: id
          }
        }))
      }

      if (event.target.closest('.filter-button')) {
        document.dispatchEvent(new CustomEvent('showFilterModal', {
          detail: {
            endpoint: this.endpoint
          }
        }))
      }

      if (event.target.closest('.pagination-button') && !event.target.closest('.pagination-button').classList.contains('disabled')) {
        const page = event.target.closest('.pagination-button').dataset.page
        let endpoint = `${this.endpoint}?page=${page}`

        if (this.filterQuery) {
          endpoint = `${endpoint}&${this.filterQuery}`
        }

        this.loadData(endpoint).then(() => this.render())
      }
    })
  }
}

customElements.define('event-categories-table-component', EventCategoryTable)
