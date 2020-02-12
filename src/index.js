import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square 컴포넌트는 <button>을 렌더링
class Square extends React.Component {
  // Square는 게임의 상태를 유지할 필요가 없기 때문에 constructor를 삭제
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}  // Square를 클릭하면 Board에서 넘겨받은 onClick 함수가 호출. Square를 클릭하면 this.handleClick(i)를 호출한다.
      >
        {this.props.value}
      </button>
    );
  }
}

// Board 컴포넌트는 사각형 9개를 렌더링
// 각 Square가 아닌 부모 Board 컴포넌트에 게임의 상태를 저장하는 것이 가장 좋은 방법
// Board 컴포넌트는 각 Square에게 prop을 전달하는 것으로 무엇을 표시할 지 알려준다.
// 여러개의 자식으로부터 데이터를 모으거나 두 개의 자식 컴포넌트들이 서로 통신하게 하려면 부모 컴포넌트에 공유 state를 정의해야 한다.
// 부모 컴포넌트는 props를 사용하여 자식 컴포넌트에 state를 다시 전달할 수 있고, 이것은 자식 컴포넌트들이 서로 또는 부모 컴포넌트와 동기화 하도록 만든다.
// 상태 관리를 부모 컴포넌트에서 하도록 한다.
class Board extends React.Component {
  // 9개의 사각형에 해당하는 9개의 null 배열을 초기 state로 설정
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();    // .slice()를 호출하는 것으로 기존 배열을 수정하지 않고 squares 배열의 복사본을 생성하여 수정
    squares[i] = 'X';
    this.setState({squares: squares})
  }

  renderSquare(i) {
    return (                                       // Board 컴포넌트에서 Square 컴포넌트로 value prop을 전달.
      <Square
        value={this.state.squares[i]}              // Square는 이제 빈 사각형에 'X', 'O', 또는 null인 value prop을 받는다.
        onClick={() => this.handleClick(i)}        // 컴포넌트는 자신이 정의한 state에만 접근할 수 있으므로 Square에서 Board의 state를 직접 변경할 수 없다.
      />                                           // 그러므로 Board에서 Square로 함수를 전달하고 Square는 사각형을 클릭할 때 함수를 호출할 것이다.
    );
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
