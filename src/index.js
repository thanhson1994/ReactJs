import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import PropTypes from 'prop-types';

const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
      name: 'Hello Kitty',
      avatarUrl: 'http://placekitten.com/g/64/64',
    },
  };
  


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
// function Clock(props) {
//     return(
//         <div>
//         <Welcome name="Sara" />
//         <h1>Hello, world!</h1>
//         <Welcome name="Min" />
//         <h2>It is {props.date.toLocaleTimeString()}.</h2>
//       </div>
//     )
// }
// Converting a Function to a Class -->
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
// const logColor = (title, color) =>
//  console.log(`New Color: ${title} | ${color}`)

class Clock extends React.Component {
  constructor(props) {
        super(props);
        this.state = {date: new Date()};
     }
  componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }

  componentWillUnmount() {
        clearInterval(this.timerID);
    }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <FormattedDate date={this.state.date} />
        </div>
      );
    }
  }

class Summary extends React.Component {
  static propTypes = {
    ingredients: PropTypes.number,
    steps: PropTypes.number,
    title: (props, propName) =>
    (typeof props[propName] !== 'string') ?
    new Error("A title must be a string") :
    (props[propName].length > 20) ?
    new Error(`title is over 20 characters`) :
    null
  }
   
    render() {
    const {ingredients, steps, title} = this.props
    return (
    <div className="summary">
    <h1>{title}</h1>
    <p>
    <span>{ingredients} Ingredients | </span>
    <span>{steps} Steps</span>
    </p>
    </div>
    )
    }
}
class AddColorForm extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    }
  submit() {
      const {_title, _color} = this.refs
      this.props.onNewColor(_title.value, _color.value)
      _title.value = ''
      _color.value = '#000000'
      _title.focus()
     }
   
  render() {
  return (
  <form onSubmit={this.submit}>
  <input ref="_title" type="text"
  placeholder="color title..." required/>
  <input ref="_color" type="color" required/>
  <button>ADD</button>
  </form>
  )
  }
 }
 
// Summary.propTypes = {
//  ingredients: PropTypes.number,
//  steps: PropTypes.number,
//  title: (props, propName) =>
//  (typeof props[propName] !== 'string') ?
//  new Error("A title must be a string") :
//  (props[propName].length > 20) ?
//  new Error(`title is over 20 characters`) : null }




ReactDOM.render(<AddColorForm  onNewColor={(title, color) => {
  console.log(`TODO: add new ${title} and ${color} to the list`)
  console.log(`TODO: render UI with new Color`)
 }} />, document.getElementById('minmin'));
ReactDOM.render(<Summary ingredients= {3} steps={3} title={"Property Validation"}  />,document.getElementById('min2'))
ReactDOM.render(<Clock/>, document.getElementById('min'));

// setInterval(tick,1000);
function Welcome(pros) {
    return <h1>Hello, {pros.name} </h1>
}

function formatDate(date) {
    return date.toLocaleDateString();
}

function Avatar(props) {
return (
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
  
    );
}

function UserInfo(props) {
return <div className="UserInfo">
    <Avatar user={props.user}/>
      <div className="UserInfo-name">
                {props.user.name}
      </div>
    </div>

}

function Comment(props) {
    return (
    <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
    </div>
    );
  }


ReactDOM.render(
    <Comment
      date={comment.date}
      text={comment.text}
      author={comment.author}
    />,
    document.getElementById('min1')
  );

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {


  renderSquare(i) {
    return(
    <Square value= {this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}/> ) 
  }
  // Since the Board passed onClick={() => this.handleClick(i)} to Square, 
  // the Square calls this.handleClick(i) when clicked.
  render() {
    return (
      <div>
      <div className="boad-row">
       {this.renderSquare(0)} 
       {this.renderSquare(1)} 
       {this.renderSquare(2)} 
      </div>
      <div className="boad-row">
       {this.renderSquare(3)} 
       {this.renderSquare(4)} 
       {this.renderSquare(5)} 
      </div>
      <div className="boad-row">
       {this.renderSquare(6)} 
       {this.renderSquare(7)} 
       {this.renderSquare(8)} 
      </div>
      </div>
    );
  }
  
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }
  
  handleClick(i) {
    // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array.
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext 
    });
    console.log(squares);
  }
  render() {
    const history = this.state.history;
    const current = history[history.length -1];
    const winner = calculateWinner(current.squares);
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return(
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares}
               onClick={(i) => this.handleClick(i) } />
      </div>
      <div className="game-info">
      <div>{status}</div>
      <ol></ol>
      </div>
    </div>
    )
  }
}

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
ReactDOM.render(<Game/>, document.getElementById('game'));


  
