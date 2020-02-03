var gPacman;
var PACMAN = '&#9786;';

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return; //BONUS
    gPacman.isSuper = true;
    for (var i = 0; i < gGhosts.length; i++) {
      gGhosts[i].color = getRandomColor();
    }
    setTimeout(() => {
      gPacman.isSuper = false;
      while (gGhosts.length !== 3) {
        var ghost = createGhost(gBoard);
        renderCell(ghost.location, GHOST);
      }
    }, 5000);
  }

  if (nextCell === CHERRY) updateScore(10);
  if (nextCell === FOOD) updateScore(1);
    
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) { // Eat the ghost.
      for (var i = 0; i < gGhosts.length; i++) {
        var ghostPos = gGhosts[i].location;
        if (ghostPos.i === nextLocation.i && ghostPos.j === nextLocation.j) {
          gGhosts.splice(i, 1);
        }
      }

    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  if (!isFoodOnBoard()) gameOver();

  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      // document.querySelector(`.cell${nextLocation.i}-${nextLocation.j}`).style.transform =  'rotate(90deg)';
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}