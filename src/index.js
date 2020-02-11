import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square 컴포넌트는 <button>을 렌더링
class Square extends React.Component {
  // 무언가를 "기억하기"위해 component는 state를 사용. 클래스에 생성자를 추가하여 state를 초기화. this.state는 정의된 React 컴포넌트에 대해 비공개로 간주해야 한다.
  // JavaScript 클래스에서 하위 클래스의 생성자를 정의할 때 항상 super를 호출해야합니다. 모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문부터 작성해야 한다.
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
    // Square의 render 함수 내부에서 onClick 핸들러를 통해 this.setState를 호출하는 것으로 React에게 <button>을 클릭할 때 Square가 다시 렌더링해야 한다고 알리게 된다.
    // 컴포넌트에서 setState를 호출하면 React는 자동으로 컴포넌트 내부의 자식 컴포넌트 역시 업데이트 한다.
    <button className="square" onClick={() => this.setState({value: 'X'})}>  {/* onClick prop으로 함수를 전달. Square 컴포넌트를 클릭하면 "X"가 체크되도록 만듬. */}
        {this.state.value}  {/* 부모 Board 컴포넌트에서 자식 Square 컴포넌트로 prop을 전달 */}
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
