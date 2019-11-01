/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  if (n === 1) {
    var solution = [[1]];
  } else if (n === 2) {
    var solution = [[1, 0], [0, 1]];
  } else {
    var board = new Board({ n: n });
    var recurse = function (board, row) {
      for (var i = 0; i < board.rows().length; i++) {
        var currBoard = new Board({ n: n });
        for (var i = 0; i < board.rows().length; i++) {
          currBoard.set(i, board.get(i));
        }

        var r = currBoard.get(row).slice();

        r[i] = 1;

        currBoard.set(row, r);

        if ((currBoard.hasAnyRooksConflicts() === false) && (row === (currBoard.rows().length - 1))) {
          return currBoard.rows();
        }

        if (currBoard.hasAnyRooksConflicts() === false) {
          return recurse(currBoard, row + 1);
        }
      }
    };

    var solution = recurse(board, 0);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var findSolution = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [[1]];
  } else if ((n > 1) && (n < 4)) {
    var board = new Board({n: n});
    return board.rows();
  } else {
    var board = new Board({n: n});

    var findSolution = function (row) {
      if (row === n) {
        return board.rows();
      }

      for (var i = 0; i < n; i++) {
        board.togglePiece(row, i);

        if (!board.hasAnyQueensConflicts()) {
          var result = findSolution(row + 1);
          if (result) {
            return result;
          }
        }
        board.togglePiece(row, i);
      }
    };
    var solution = findSolution(0);

    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var findSolution = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyQueensConflicts()) {
        findSolution(row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
