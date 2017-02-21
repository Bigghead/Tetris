const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(10, 10);

context.fillStyle= '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

//=====make tetris pieces====
//'T'
const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

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

drawPiece(matrix, { x: 5, y: 5 });
