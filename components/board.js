class BoardElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._input;
    this._boardId;
  }

  connectedCallback() {
    this.render();
    this._boardId = this.getAttribute("id");
    this._boardRow = this.shadow.querySelector(".board-row");
    this._boardColumn = this.shadow.querySelector(".board-column");
    const editButton = this.shadow.querySelector(".edit-button");
    const deleteButton = this.shadow.querySelector(".delete-button");
    editButton.addEventListener("click", this.handleEditDisplay);
    deleteButton.addEventListener("click", this.handleDelete);
  }

  handleEditDisplay = (e) => {
    this._boardColumn.innerHTML = "";
    const form = document.createElement("form");
    this._input = document.createElement("input");
    this._input.type = "text";
    this._input.placeholder = this.getAttribute("title");
    this._input.required = true;
    const submitButton = document.createElement("button");
    submitButton.textContent = "Edit";
    form.appendChild(this._input);
    form.appendChild(submitButton);
    this._boardColumn.appendChild(form);
    submitButton.addEventListener("click", this.handleSubmit);
  };

  handleSubmit = async (e) => {
    const boardTitle = this._input.value;

    if (boardTitle) {
      e.preventDefault();
      const data = {
        title: boardTitle
      };

      await fetch(`http://localhost:3000/boards/${this._boardId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  };

  handleDelete = async (e) => {
    await fetch(`http://localhost:3000/boards/${this._boardId}`, {
      method: "DELETE"
    })
  }

  render() {
    const template = `
    <style>
     .board-row {
      display: inline-block;
      background-color: #EBECF0;
      border: 1px solid black;
      border-radius: 3px;
      width: 300px;
      margin: 0 30px 0 0;
      padding: 5px 10px 5px 10px;
      word-wrap: break-word;       
      white-space: -webkit-pre-wrap; 
      white-space: normal;
     }

     .board-column {
       margin-bottom: 10px;
     }

     form {
        max-width: 100%;
        height: 100%;
      }
      input {
        display: inline-block;
        background-color: #FFFFFF;
        border: 1px solid black;
        border-radius: 2px;
        margin: 2px;
        width: -webkit-fill-available;
      }

      span:hover {
        cursor: pointer;
      }
    </style>
    <div id="${this.getAttribute("id")}" class="board-row ${this.getAttribute(
      "id"
    )}">
     <div class="board-column">${this.getAttribute(
       "title"
     )} <span class="edit-button"> 🖊</span>
        <span class="delete-button"> 🗑️</span>  
     </div>
     <div class="tasks"></div>
     <div class="add-task">
      <add-task id=${this.getAttribute("id")}></add-task>
     </div>
     </div>
    </div>`;
    this.shadow.innerHTML = template;
  }
}

customElements.define("board-element", BoardElement);
