const grid = document.getElementById("sudoku");
let board = [];
let element = [];

let grids = [...grid.getElementsByTagName("input")];
for (let i = 0; i < 9; i++) {
  board[i] = [];
  element[i] = [];
  for (let j = 0; j < 9; j++) {
    let input = grids.shift();
    input.addEventListener("input", function () {
      if (!"0123456789".includes(input.value)) input.value = "";
      board[i][j] = input.value ? parseInt(input.value) : 0;
    });
    board[i][j] = 0;
    element[i][j] = input;
  }
}

function isValid(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] == num || board[x][col] == num) return false;
  }
  let startRow = row - (row % 3),
    startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] == num) return false;
    }
  }
  return true;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function solve(board, element, slow) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            element[row][col].value = num;
            if (slow) await sleep(10);
            if (await solve(board, element, slow)) return true;
            board[row][col] = 0;
            element[row][col].value = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

let solveButton = document.getElementById("solve");
let perlambatCheckbox = document.getElementById("perlambat");
solveButton.addEventListener("click", () =>
  solve(board, element, perlambatCheckbox.checked)
);
