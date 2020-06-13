import React from 'react';

function TicTacToe() {
  return (
    <div className="container">
      <h1 className="header">Tic Tac Toe</h1>
      <div className="board">
        <div className="row" key="row0">
          <button className="box" key="row0box0">
            -
          </button>
          <button className="box" key="row0box1">
            -
          </button>
          <button className="box" key="row0box2">
            -
          </button>
        </div>
        <div className="row" key="row1">
          <button className="box" key="row1box0">
            -
          </button>
          <button className="box" key="row1box1">
            -
          </button>
          <button className="box" key="row1box2">
            -
          </button>
        </div>
        <div className="row" key="row2">
          <button className="box" key="row2box0">
            -
          </button>
          <button className="box" key="row2box1">
            -
          </button>
          <button className="box" key="row2box2">
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
