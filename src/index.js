import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square 컴포넌트는 <button>을 렌더링
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}  {/* 부모 Board 컴포넌트에서 자식 Square 컴포넌트로 prop을 전달 */}
      </button>
    );
  }
}

// Board 컴포넌트는 사각형 9개를 렌더링
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;  // Board 컴포넌트에서 Square 컴포넌트로 value prop을 전달.
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// Game 컴포넌트는 게임판을 렌더링하며, 나중에 수정할 자리 표시자 값을 가지고 있다.
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
