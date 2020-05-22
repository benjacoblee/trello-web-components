class TaskElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    const deleteButtons = this.shadow.querySelectorAll("span");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        const taskId = e.target.id;
        await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: "DELETE"
        });
      });
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
    </style>
    <div class=tasks>
    <strong>${this.getAttribute("title")}</strong><span id=${this.getAttribute(
      "id"
    )}> x</span>
    <br>
    ${this.getAttribute("description")}
    </div>`;
    this.shadow.innerHTML = template;
  }
}

customElements.define("task-element", TaskElement);
