window.addEventListener("DOMContentLoaded", () => {
  const fetchBoards = async () => {
    const res = await fetch("http://localhost:3000/boards");
    const json = await res.json();

    json.forEach(({ id, title }) => {
      const boardContainer = document.querySelector(".board-container");
      const board = document.createElement("board-element");
      board.setAttribute("id", id)
      board.setAttribute("title", title);
      boardContainer.appendChild(board);
    });
  };

  fetchBoards();
});
