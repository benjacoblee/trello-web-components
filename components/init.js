window.addEventListener("DOMContentLoaded", () => {
  const fetchBoards = async () => {
    const res = await fetch("http://localhost:3000/boards");
    const json = await res.json();

    json.forEach(({ id, title }) => {
      const boardContainer = document.querySelector(".board-container");
      const board = document.createElement("board-element");
      board.setAttribute("id", "board-row-" + id);
      board.setAttribute("title", title);
      boardContainer.appendChild(board);
    });
  };

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:3000/tasks`);
    const json = await res.json();

    json.forEach(({ id, description, boardId }) => {
      if (id) {
        const task = document.createElement("task-element");
        task.setAttribute("description", description);
        task.setAttribute("id", "task-" + id);
        const board = document.querySelector(`#board-row-${boardId}`);
        const tasks = board.shadowRoot.querySelector(".tasks");
        tasks.appendChild(task);
      }
    });
  };

  fetchBoards();
  fetchTasks();
});
