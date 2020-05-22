class AddBoard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._insertInput = true;
    this._clickElement;
  }

  handleSubmit = async () => {
    if (this._insertInput) {
      this._clickElement.textContent = "";
      const input = document.createElement("input");
      input.placeholder = "Board name";
      input.required = true;
      this._clickElement.insertAdjacentElement("afterend", input);
      const submit = document.createElement("button");
      submit.textContent = "Submit";
      submit.type = "submit";
      input.insertAdjacentElement("afterend", submit);
      this._insertInput = false;
      submit.addEventListener("click", async (e) => {
        if (input.value) {
          const data = {
            title: input.value
          };

          await fetch("http://localhost:3000/boards", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          });
        } else {
          e.preventDefault();
        }
      });
    }
  };

  connectedCallback() {
    this.render();

    this._clickElement = this.shadow.querySelector("span");
    this._clickElement.addEventListener("click", this.handleSubmit);
  }

  render() {
    const template = `
    <style>
      div {
        margin: 6px;
      }
      span, input {
        margin-right: 5px;
      }
      span:hover {
        cursor: pointer;
      }
      input {
        border-radius: 5px;
      }
      
    </style>
    <div>Add a Board <span>➕</span></div>
    `;
    this.shadow.innerHTML = template;
  }
}

customElements.define("add-board", AddBoard);
