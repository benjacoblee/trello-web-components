class TaskElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._taskTitle;
    this._showTask = false;
  }

  handleDeleteClick = async (e) => {
    const taskId = e.target.id;
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE"
    });
  };

  handleDisplayClick = () => {
    this._showTask ? (this._showTask = false) : (this._showTask = true);
    this._showTask
      ? (this._taskDescription.style.display = "block")
      : (this._taskDescription.style.display = "none");
  };

  connectedCallback() {
    this.render();
    this._taskTitle = this.shadow.querySelector(".title");
    this._taskDescription = this.shadow.querySelector(".description");
    const deleteButtons = this.shadow.querySelectorAll("span");
    this._taskTitle.addEventListener("click", this.handleDisplayClick);
    deleteButtons.forEach((button) => {
      button.addEventListener("click", this.handleDeleteClick);
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

     span:hover {
      cursor: pointer;
     }

     p {
       margin: 0;
     }

     p.title {
       font-weight: bold;
     }

     p.title:hover {
       cursor: pointer;
     }

     .description {
       display: none;
     }
    </style>
    <div class=tasks>
    <p class="title">${this.getAttribute("title")} <span id=${this.getAttribute(
      "id"
    )}> 🗑️</span></p>
    <p class="description">${this.getAttribute("description")}</p>
    </div>`;
    this.shadow.innerHTML = template;
  }
}

customElements.define("task-element", TaskElement);
