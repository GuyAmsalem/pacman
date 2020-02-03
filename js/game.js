'use strict';
var WALL = '🎛️';
var FOOD = '.';
var SUPER_FOOD = '✨';
var EMPTY = ' ';
var CHERRY = '🍒';

var gIntervalCherry;
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gIntervalCherry = setInterval(addCherry, 15000);
  document.querySelector('.game-over').hidden = true;
  document.querySelector('.play-again').hidden = true;
  gGame.score = 0;
  gGame.isOn = true;
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if ((i === 1 && j === 1) || (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) || (i === SIZE - 2 && j === SIZE - 2)) {
        board[i][j] = SUPER_FOOD;
      }

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}

function isVictory() {
  return gPacman.foodCollected === 56;
}

function isFoodOnBoard() {
  for (let i = 0; i < gBoard.length; i++) {
    for (let j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j];
      if (cell === FOOD) return true;
    }
  }
  return false;
}

function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(gIntervalCherry);
  gIntervalGhosts = null;
  gIntervalCherry = null;
  if (!isFoodOnBoard()) {
    document.querySelector('.play-again').hidden = false;
  } else {
    document.querySelector('.game-over').hidden = false;
  }
}

function addCherry() {
  var emptys = getEmptyLocations();
  if (emptys.length === 0) return;
  console.log(emptys);
  var rndIdx = getRandomIntInclusive(0, emptys.length - 1)
  var rndEmptyCell = emptys[rndIdx];
  gBoard[rndEmptyCell.i][rndEmptyCell.j] = CHERRY;
  renderCell(rndEmptyCell, CHERRY);
}

function getEmptyLocations() {
  var emptyLocations = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var pos = { i: i, j: j }
      if (gBoard[i][j] === EMPTY) {
        emptyLocations.push(pos);
      }
    }
  }
  return emptyLocations;
}






