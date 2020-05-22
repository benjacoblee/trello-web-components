# trello-web-components

## Installation 

Navigate to cloned directory's location. In the terminal, run:

    npm i
    npm start

## Application Structure
- components
    - addBoard.js (listens for click event and makes API call to create a board)
    - addTask.js (listens for click event and makes API call to add a task)
    - board.js (for each board, renders columns. also contains logic to edit and delete each board)
    - init.js (initial API call to get board and task data, creates board elements and task elements)
    - tasks.js (for each task, renders a task. also contains logic to view descriptions and delete each task)
- css 
    - styles.css (global styles. note: shadow elements are styled within component files)
- materials
    - db.json (fake API, serves up data)
- index.html (contains html elements and script files needed to run app)

## App Requirements

### Completed
- [x] display all columns with all cards
- [x] create a new card
- [x] delete a card
- [x] add a column
- [x] modify a column
- [x] delete a column
- [x] click on a card to see its description. The description should be in the same view and extend the card container. It should not open in another page or popup/modal

### Uncompleted
- [] modify a card
- [] search for any keywords presents on one or multiple cards. The view should update without reloading the whole page, drag and drop a card from one column to another
- [] Cards and columns should be unique (i.e we should not see 2 cards or 2 columns with the same title).