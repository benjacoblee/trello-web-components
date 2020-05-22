class AddTask extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._boardId = this.getAttribute("id");
    this._input;
  }

  handleSubmit = async (e) => {
    if (this._input.value) {
      const data = {
        description: this._input.value,
        boardId: this._boardId
      };

      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  };

  connectedCallback() {
    this.render();
    this._input = this.shadow.querySelector("input");
    const button = this.shadow.querySelector("button");
    button.addEventListener("click", this.handleSubmit);
  }

  render() {
    const template = `
    <style>
      form {
        display: flex;
        justify-content: space-between;
        height: 100%;
      }
      input {
        display: block;
        background-color: #FFFFFF;
        border: 1px solid black;
        border-radius: 2px;
        margin: 2px;
        padding: 5px;
        width: 100%;
      }
      button {
        display: block;
        float: right;
      }
      </style>
    <form>
      <input placeholder="New Task" required></input>
      <button>Submit</button>
    </form>
    `;

    this.shadow.innerHTML = template;
  }
}

customElements.define("add-task", AddTask);
