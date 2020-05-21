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
    </style>
    <div class=tasks>${this.getAttribute("description")}
    <span id=${this.getAttribute("id")}>x</span>
    </div>`;
    this.shadow.innerHTML = template;
  }
}

customElements.define("task-element", TaskElement);
