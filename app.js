const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(10, 10);

//=====make tetris pieces====
//'T'
const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

const player = {
  position: { x: 5, y: 5},
  matrix: matrix
};

const arena = createMatrix(24, 40);

function collide (arena, player){
  const [m, o] = [player.matrix, player.position];
  for(let y = 0; y < m.length; ++y){
    for(let x = 0 ; x < m[y].length; ++x){
      if(m[y][x] !== 0 &&
        (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0){
        return true;
      }
    }
  }
  return false;
}

function createMatrix (w, h){
  const matrix = [];
  while( h !== 0){
    matrix.push(new Array(w).fill(0));
    h --;
  }
  return matrix;
}

function merge(arena, player){
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if(value !== 0){
        arena[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}

function draw (){
  context.fillStyle= '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawPiece(arena, {x: 0 , y: 0});
  drawPiece(player.matrix, player.position);
}

function drawPiece(matrix, offset){
  matrix.forEach(function(row, y){
    row.forEach(function(value, x){
      if(value !== 0 ){
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function playerDrop(){
  player.position.y ++;
  if(collide(arena, player)){
    player.position.y --;
    merge(arena, player);
    player.position.y = 0 ;
  }
  dropCounter = 0;
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0){
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if(dropCounter > dropInterval){
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', function(e){
  if(e.keyCode === 37){ //left key
    player.position.x --;
  } else if(e.keyCode === 39){  //right key
    player.position.x ++;
  } else if(e.keyCode === 40){ //down
    playerDrop();
  }
});

update();
