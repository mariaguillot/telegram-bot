class Faqs extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    this.data = []
  }

  async connectedCallback() {
    await this.loadData()
    await this.render()
  }

  async loadData() {
    this.data = [
      {
        title: "¿Qué elementos principales se incluyen en el diseño de un sitio web personalizado?",
        content: "Lorem 2 ipsum dolor sit amet consectetur adipisicing elit. Dolores praesentium ratione itaque earum aperiam aliquam, error culpa fugiat ea corporis impedit. Ea illo et facilis nulla esse distinctio iste nesciunt."
      },
      {
        title: "¿Cuáles son los principios más importantes del diseño de sitios web?",
        content: "Lorem 3 ipsum dolor sit amet consectetur adipisicing elit. Dolores praesentium ratione itaque earum aperiam aliquam, error culpa fugiat ea corporis impedit. Ea illo et facilis nulla esse distinctio iste nesciunt."
      },
      {
        title: "¿Qué pasos incluye el proceso de diseño web profesional?",
        content: "Lorem 3 ipsum dolor sit amet consectetur adipisicing elit. Dolores praesentium ratione itaque earum aperiam aliquam, error culpa fugiat ea corporis impedit. Ea illo et facilis nulla esse distinctio iste nesciunt."
      }
    ]
  }

  render() {
    this.shadow.innerHTML =
    /*html*/`
    <style>

      *{
        box-sizing: border-box;
      }

      h1, h2, h3, h4, h5, h6, p{
        margin: 0;
      }

      h1, h2, h3, h4, h5, h6, p, a, span, li, label, input, button{
        font-family: "Nunito Sans", serif;
        font-optical-sizing: auto;
      }

      .faqs{
        background-color: hsl(0, 0%, 100%);
        padding: 2rem;

        @media (min-width: 1280px) {
          padding: 2rem 20%;
        }
      }

      .faqs-title{
        padding: 2rem 0;
      }

      .faqs-title h3{
        font-weight: 600;
        font-size: 2rem;
        text-transform: uppercase;
      }

      .faqs-content{
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .faq:first-child{
        border-top: 1px solid black;
      }

      .faqs summary{
        border-bottom: 1px solid black;
        display: grid;
        font-size: 1.3rem;
        gap: 2rem;
        grid-template-columns: 8fr 1fr;
        padding: 1rem 0;
      }

      .faqs details[open] summary{
        border: none;
      }

      .faqs details[open]{
        border-bottom: 1px solid black;
        padding-bottom: 2rem;
      }

      .faqs details p{
        font-size: 1.5rem;
        line-height: 1.5;
      }

      .faq-button{
        cursor: pointer;
      }

      .faq-button svg{
        width: 3rem;
      }
    </style>

    <section class="faqs">
      <div class="faqs-title">
        <h3>Preguntas frecuentes</h3>
      </div>
      <div class="faqs-content"></div>
    </section>
    `

    this.data.forEach(faq => {
      const faqsContainer = this.shadow.querySelector('.faqs-content')
      const faqContainer = document.createElement('div')
      faqContainer.classList.add('faq')
      faqsContainer.appendChild(faqContainer)

      const details = document.createElement('details')
      details.name = 'faqs'
      faqContainer.appendChild(details)

      const summary = document.createElement('summary')
      details.appendChild(summary)

      const faqContentTitle = document.createElement('div')
      faqContentTitle.classList.add('faq-content-title')
      summary.appendChild(faqContentTitle)

      const faqTitle = document.createElement('h3')
      faqTitle.textContent = faq.title
      faqContentTitle.appendChild(faqTitle)

      const faqButton = document.createElement('div')
      faqButton.classList.add('faq-button')
      summary.appendChild(faqButton)
      
      faqButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>plus</title>
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>`

      const faqContent = document.createElement('p')
      faqContent.textContent = faq.content
      details.appendChild(faqContent)
    })
  }
}

customElements.define('faqs-component', Faqs);