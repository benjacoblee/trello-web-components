class AddTask extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._boardId = this.getAttribute("id");
    this._input;
    this._textarea;
    this._formIsVisible = false;
  }

  connectedCallback() {
    this.render();
    this._input;
    this._textarea;
    const addTaskButton = this.shadow.querySelector(".add-button");
    addTaskButton.addEventListener("click", this.renderForm);
  }

  renderForm = () => {
    const div = this.shadow.querySelector("div");
    const form = document.createElement("form");
    if (!this._formIsVisible) {
      this._formIsVisible = true;
      const form = document.createElement("form");
      this._input = document.createElement("input");
      this._input.type = "text";
      this._input.placeholder = "Task Title";
      this._input.required = true;
      this._textarea = document.createElement("textarea");
      this._textarea.placeholder = "Task Description";
      this._textarea.rows = 4;
      this._textarea.required = true;
      const submitButton = document.createElement("button");
      submitButton.textContent = "Submit";
      submitButton.addEventListener("click", this.handleSubmit);

      form.appendChild(this._input);
      form.appendChild(this._textarea);
      form.appendChild(submitButton);
      div.appendChild(form);
    } else {
      this._formIsVisible = false;
      div.removeChild(div.lastChild);
    }
  };

  handleSubmit = async (e) => {
    if (this._input.value && this._textarea.value) {
      e.preventDefault();
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
        window.location.reload(true);
      });
    }
  };

  render() {
    const template = `
    <style>
      form {
        max-width: 100%;
        height: 100%;
      }
      div, input, textarea {
        display: block;
        background-color: #FFFFFF;
        border: 1px solid black;
        border-radius: 2px;
        margin: 2px;
        width: -webkit-fill-available;
      }
      div {
       padding: 5px;
       font-weight: bold;
      }
      .add-button:hover {
        cursor: pointer;
      }
      </style>
    <div>Add a Task<span class="add-button"> ➕</span></div>
    `;

    this.shadow.innerHTML = template;
  }
}

customElements.define("add-task", AddTask);
