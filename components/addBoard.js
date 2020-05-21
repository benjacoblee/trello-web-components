class AddBoard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._insertInput = true;
  }

  connectedCallback() {
    this.render();

    const clickElement = this.shadow.querySelector("span");
    clickElement.addEventListener("click", () => {
      if (this._insertInput) {
        clickElement.textContent = "";
        const form = document.createElement("form");
        form.method = "POST";
        const input = document.createElement("input");
        input.placeholder = "Board name";
        input.required = true;
        const button = document.createElement("button");
        button.textContent = "Submit";
        button.type = "submit";
        form.appendChild(input);
        form.appendChild(button);
        clickElement.insertAdjacentElement("afterend", form);
        this._insertInput = false;
        button.addEventListener("click", async (e) => {
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
            })
          }
        });
      }
    });
  }

  render() {
    const template = `
    <style>
      div {
        margin-left: 6px;
      }
      form {
        display: inline;
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
    <div>Add a Board <span>+</span></div>
    `;
    this.shadow.innerHTML = template;
  }
}

customElements.define("add-board", AddBoard);
