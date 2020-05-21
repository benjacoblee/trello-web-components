class AddTask extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._boardId = this.getAttribute("id");
  }

  connectedCallback() {
    this.render();

    let clickElement = this.shadowRoot.querySelector("span");
    clickElement.addEventListener("click", () => {
      const inputElement = document.createElement("input");
      inputElement.type = "text";
    });
  }

  render() {
    const template = `
    <style>
      div {
        display: block;
        background-color: #FFFFFF;
        border: 1px solid black;
        border-radius: 2px;
        margin: 2px;
        padding: 5px;
      }
      </style>
     <div>
    <p>Add a card <span>+</span></p>
    </div>`;

    this.shadow.innerHTML = template;
  }
}

customElements.define("add-task", AddTask);
