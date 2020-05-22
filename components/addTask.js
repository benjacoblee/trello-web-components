class AddTask extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._boardId = this.getAttribute("id");
    this._input;
    this._textarea;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this._input.value && this._textarea.value) {
      const data = {
        title: this._input.value,
        description: this._textarea.value,
        boardId: this._boardId
      };

      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        console.log(res);
      });
    }
  };

  connectedCallback() {
    this.render();
    this._input = this.shadow.querySelector("input");
    this._textarea = this.shadow.querySelector("textarea");
    const button = this.shadow.querySelector("button");
    button.addEventListener("click", this.handleSubmit);
  }

  render() {
    const template = `
    <style>
      form {
        max-width: 100%;
        height: 100%;
      }
      input, textarea {
        display: block;
        background-color: #FFFFFF;
        border: 1px solid black;
        border-radius: 2px;
        margin: 2px;
        width: -webkit-fill-available;
      }
      </style>
    <form>
      <input placeholder="Task Title" required></input>
      <textarea placeholder="Task Description" rows="4" required></textarea>
      <button>Submit</button>
    </form>
    `;

    this.shadow.innerHTML = template;
  }
}

customElements.define("add-task", AddTask);
