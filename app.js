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

function draw (){
  context.fillStyle= '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
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

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0){
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  if(dropCounter > dropInterval){
    player.position.y ++;
    dropCounter = 0;
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', function(e){
  if(e.keyCode === 37){ //left key
    player.position.x --;
  } else if(e.keyCode === 39){  //right key
    player.position.x ++;
  }
});

update();
