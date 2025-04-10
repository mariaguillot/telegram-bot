class Form extends HTMLElement {
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
      }

      svg {
        width: 2.5rem;
        fill: hsl(0, 0.00%, 0.00%);
      }

      ul {
        list-style: none;
        padding-left: 1rem;
        margin: 0;
        background-color: hsl(208, 100.00%, 25.30%);
        padding:0.8rem;
      }

      li{
        color: white;
        padding:0%;
      }

      button{
        all: unset;
        cursor: pointer;
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
        
      }

      .form-buttons {
        display:flex;
        justify-content: space-between;
      }


      .form-inputs{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
        gap:1rem;
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
      }  
    </style>

    <div class="form">
      <div class="form-header">
        <div class="form-tabs">
          <ul>
            <li>General</li>
          </ul>
        </div>
        <div class="form-buttons">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>reload</title><path d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" /></svg>
          </button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-save</title><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
          </button>
        </div>
      </div>
      <div class="form-body">
        <form>
          <div class="form-inputs">
            <input type="text" placeholder="complete name">
            <input type="text" placeholder="complete email">
          </div>
        </form>
      </div>
    </div>
    `
  }
}

customElements.define('form-component', Form)
