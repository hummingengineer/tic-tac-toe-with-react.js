import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square 컴포넌트는 <button>을 렌더링
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>  {/* Square를 클릭하면 Board에서 넘겨받은 onClick 함수가 호출. Square를 클릭하면 this.handleClick(i)를 호출한다. */}
      {props.value}
    </button>
  );
}

// Board 컴포넌트는 사각형 9개를 렌더링
// 각 Square가 아닌 부모 Board 컴포넌트에 게임의 상태를 저장하는 것이 가장 좋은 방법
// Board 컴포넌트는 각 Square에게 prop을 전달하는 것으로 무엇을 표시할 지 알려준다.
// 여러개의 자식으로부터 데이터를 모으거나 두 개의 자식 컴포넌트들이 서로 통신하게 하려면 부모 컴포넌트에 공유 state를 정의해야 한다.
// 부모 컴포넌트는 props를 사용하여 자식 컴포넌트에 state를 다시 전달할 수 있고, 이것은 자식 컴포넌트들이 서로 또는 부모 컴포넌트와 동기화 하도록 만든다.
// 상태 관리를 부모 컴포넌트에서 하도록 한다.
class Board extends React.Component {
  renderSquare(i) {
    return (                                       // Board 컴포넌트에서 Square 컴포넌트로 value prop을 전달.
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}      // 각 Square의 위치를 onClick 핸들러에게 넘겨주어 어떤 Square를 클릭했는지 표시
      />
    );
  }

  render() {
    return (
      <div>
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
// Game 컴포넌트는 Board의 데이터를 완벽히 제어할 수 있으며 history에 저장된 과거의 차례를 Board가 렌더링 할 수 있게 만든다.
class Game extends React.Component {
  // 초기 state 설정
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();  // .slice()를 호출하는 것으로 기존 배열을 수정하지 않고 squares 배열의 복사본을 생성하여 수정
    if (calculateWinner(squares) || squares[i]) return;  // // 누군가가 승리하거나 Square가 이미 채워졌다면 Board의 handleClick 함수가 클릭을 무시
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,                        // stepNumber state는 현재 사용자에게 표시되는 이동을 반영
      xIsNext: (step % 2) === 0,               // stepNumber가 짝수일 때 마다 xIsNext를 true로 설정
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) status = 'Winner: ' + winner;
    else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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

// 9개의 사각형의 배열을 가지고 함수는 승자를 확인하여 적절한 값으로 'X', 'O', 또는 null을 반환
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
