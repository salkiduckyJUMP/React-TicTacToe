import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//TICTACTOE React Tutorial

//Prop is passed from parent board component to child square component
//The Square component is also a Controlled component; Board component has full control over them.
//Square becomes a Functional component that takes props as input and returns what should be rendered
function Square(props) {
  /*
  Constructor used here to initialize state
  constructor(props) {
    All constructors in React should have a super(props) call to start
    super(props);
    this.state = {
      value: null,
    };
  }
  */

    return (
      //Passes a function as the onClick prop
      //Whenever a user clicks on a square, rerender with the new state
      // <button
      //   className="square"
      //   onClick={() => this.props.onClick()}
      // >
      //   {this.props.value}
      // </button>

      <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
  }

  
  class Board extends React.Component {

    //Declare a shared parent state for each child square to inherit from
    //Start our board with each square having a null value
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     squares: Array(9).fill(null),
    //     //Sets X to be the first move by default
    //     xIsNext: true,
    //   };
    // }

    // handleClick(i) {
    //   const squares = this.state.squares.slice();
    //   if (calculateWinner(squares) || squares[i]) {
    //     return;
    //   }
    //   squares[i] = this.state.xIsNext ? 'X' : 'O';
    //   this.setState({
    //     squares: squares,
    //     //Makes it so that the users can take turns in our tic-tac-toe game
    //     xIsNext: !this.state.xIsNext,
    //   });
    // }

      //Each square is rendered with a state value prop which is X, O, or null
      //Square will call the onClick function when a square is clicked
      //State is stored in Board instead of the individual Squares
      //When state of a Square changes, it rerenders in the Square component
      renderSquare(i) {
        return (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />
        );
      }

      
  
      render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //   //If a winner is found, displays who it is, X or O
        //   status = 'Winner: ' + winner;
        // } else {
        //   //Displays whos turn it is
        //   status = 'Current player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }
    
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

  //Checks for a winner using the array of squares
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
  
  class Game extends React.Component {
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
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      //Always displays current step from the history of steps
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        //Will toss any future steps when we go abck to a previous step
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    //Updates step number to allow for "time travel" to previous steps
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
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
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
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
  