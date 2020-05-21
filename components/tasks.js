class TaskElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
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
    <div>${this.getAttribute("description")}</div>`;
    this.shadow.innerHTML = template;
  }
}

customElements.define("task-element", TaskElement);
