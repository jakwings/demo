function rand(a, b, arr) {
  if (a instanceof Array) {
    return a[Math.floor(Math.random()*a.length)];
  }
  if (typeof b === 'undefined') {
    b = a;
    a = 0;
  }
  var r = a + Math.floor(Math.random()*(b-a));
  return arr instanceof Array ? arr[r] : r;
}

var cfg = {
  position: 'clear',
  showNotation: true,
  draggable: true,
  sparePieces: true,
  dropOffBoard: 'trash',
  pieceTheme: 'img/chesspieces/alpha/{piece}.png',
  appearSpeed: 'fast',
  moveSpeed: 'fast',
  snapbackSpeed: 'fast',
  snapSpeed: 'fast',
  trashSpeed: 'fast',
  showErrors: false,
};

var board = new ChessBoard('board', cfg);

$('#start').on('click', board.start);
$('#clear').on('click', board.clear);
$('#reload').on('click', location.reload.bind(location, false));
$('#mess').on('click', demo.bind(null, 8, true));

var ROWS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var COLS = [1, 2, 3, 4, 5, 6, 7, 8];

function demo(n, toAnimate) {
  n = n || 8;  // number of queens, max: 8
  var rw = new Array(n);      // column index of each row
  var dd = new Array(2*n-1);  // downward diagonals
  var ud = new Array(2*n-1);  // upward diagonals
  var solutions = [];
  var solve = function (c) {
    c = c || 0;
    if (c >= n) {
      var pos = {};
      for (var i = 0; i < n; i++) {
        pos[ROWS[i]+COLS[rw[i]]] = 'bQ';
      }
      solutions.push(pos);
    } else {
      for (var r = 0; r < n; r++) {
        if (rw[r] === undefined &&
            dd[r-c+n] === undefined &&
            ud[r+c-1] === undefined) {
          rw[r] = c;
          dd[r-c+n] = c;
          ud[r+c-1] = c;
          solve(c+1);
          rw[r] = undefined;
          dd[r-c+n] = undefined;
          ud[r+c-1] = undefined;
        }
      }
    }
  };
  solve();
  for (var i = 0, l = solutions.length; i < l; i++) {
    setTimeout((function (pos) {
      board.position(pos, !!toAnimate);
    }).bind(null, solutions[i]), i*1000);
  }
}
