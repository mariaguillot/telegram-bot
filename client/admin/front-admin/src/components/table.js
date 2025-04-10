class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  loadData () {
    this.data = [
      {
        name: 'Carlos',
        email: 'carlossedagambin@gmail.com',
        createdAt: '2024-04-22',
        updatedAt: '2024-04-22'
      },
      {
        name: 'Maria',
        email: 'carlossedagambin@gmail.com',
        createdAt: '2024-04-22',
        updatedAt: '2024-04-22'
      },
      {
        name: 'Mark',
        email: 'carlossedagambin@gmail.com',
        createdAt: '2024-04-22',
        updatedAt: '2024-04-22'
      },
      {
        name: 'Maria',
        email: 'carlossedagambin@gmail.com',
        createdAt: '2024-04-22',
        updatedAt: '2024-04-22'
      },
      {
        name: 'Mark',
        email: 'carlossedagambin@gmail.com',
        createdAt: '2024-04-22',
        updatedAt: '2024-04-22'
      },
      {
        name: 'Maria',
        email: 'carlossedagambin@gmail.com',
        createdAt: '2024-04-22',
        updatedAt: '2024-04-22'
      },
      {
        name: 'Mark',
        email: 'carlossedagambin@gmail.com',
        createdAt: '2024-04-22',
        updatedAt: '2024-04-22'
      },
    ]
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
      *{
        box-sizing: border-box;
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
        padding: 0.5rem;
        display: flex;
        justify-content: bottom;
        background-color: hsl(208, 69.20%, 72.00%);
        color: black;
        bottom: 3vh;
      }
    </style>

    <section class="table"></section>
    `

    const tableContainer = this.shadow.querySelector('.table')
    const headerTable = document.createElement('div')
    headerTable.classList.add('header-table')
    tableContainer.appendChild(headerTable)

    const headerUl = document.createElement('ul')
    headerTable.appendChild(headerUl)
    const headerLi = document.createElement('li')
    headerUl.appendChild(headerLi)
    const filterButton = document.createElement('button')
    filterButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>filter</title><path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" /></svg>'
    headerLi.appendChild(filterButton)

    const bodyTableContainer = document.createElement('div')
    bodyTableContainer.classList.add('body-table')
    tableContainer.appendChild(bodyTableContainer)

    this.data.forEach(element => {
      const register = document.createElement('div')
      register.classList.add('register')
      bodyTableContainer.appendChild(register)

      const headerBodyContainer = document.createElement('div')
      headerBodyContainer.classList.add('header-body')
      register.appendChild(headerBodyContainer)

      const editIcon = document.createElement('div')
      editIcon.classList.add('edit-icon')
      headerBodyContainer.appendChild(editIcon)
      const editButton = document.createElement('button')
      editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>'
      editIcon.appendChild(editButton)

      const trashIcon = document.createElement('div')
      trashIcon.classList.add('trash-icon')
      headerBodyContainer.appendChild(trashIcon)
      const trashButton = document.createElement('button')
      trashButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
      trashIcon.appendChild(trashButton)

      const infoBody = document.createElement('div')
      infoBody.classList.add('info-body')
      register.appendChild(infoBody)

      const infoUl = document.createElement('ul')
      infoBody.appendChild(infoUl)

      let infoLi = document.createElement('li')
      infoLi.textContent = `Nombre: ${element.name}`
      infoUl.appendChild(infoLi)

      infoLi = document.createElement('li')
      infoLi.textContent = `Email: ${element.email}`
      infoUl.appendChild(infoLi)

      infoLi = document.createElement('li')
      infoLi.textContent = `Fecha de creación: ${element.createdAt}`
      infoUl.appendChild(infoLi)

      infoLi = document.createElement('li')
      infoLi.textContent = `Fecha de actualización: ${element.updatedAt}`
      infoUl.appendChild(infoLi)
    })

    const footerTable = document.createElement('div')
    footerTable.classList.add('footer-table')
    tableContainer.appendChild(footerTable)
    const countPages = document.createElement('span')
    countPages.innerHTML = '1 registro en total, mostrando 10 por página'
    footerTable.appendChild(countPages)
  }
}

customElements.define('table-component', Table)
