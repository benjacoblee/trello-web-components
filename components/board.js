class BoardElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._title = "Default Title";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = `
    <style>
     .board-row {
       display: inline-block;
       background-color: #EBECF0;
       border: 1px solid black;
       border-radius: 3px;
       width: 33%;
       padding: 5px 10px 5px 10px;
     }

     .board-column {
       margin-bottom: 10px;
     }
    </style>
    <div class="board-row">
     <div class="board-column">${this.getAttribute("title")}</div>
     <div class="tasks"></div>
     <div class="add-card">
     </div>
     </div>
    </div>`;
    this.shadow.innerHTML = template;
  }
}

customElements.define("board-element", BoardElement);
