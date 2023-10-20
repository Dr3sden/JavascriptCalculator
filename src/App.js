import React, { Component } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      currentInput: '0',
      expression: '',
      evaluated: false,
    };
  }

  handleNumberClick = (number) => {
    const { currentInput, evaluated } = this.state;
    if (evaluated) {
      this.setState({
        currentInput: number,
        display: number,
        evaluated: false,
      });
    } else {
      this.setState((prevState) => ({
        currentInput:
          prevState.currentInput === '0' ? number : prevState.currentInput + number,
        display:
          prevState.currentInput === '0' ? number : prevState.display + number,
      }));
    }
  };
  //a

  handleOperatorClick = (operator) => {
    const { currentInput, evaluated, expression } = this.state;
  
    if (evaluated) {
      this.setState((prevState) => ({
        expression: prevState.currentInput + ` ${operator}`,
        currentInput: '0',
        display: '0',
        evaluated: false,
      }));
    } else {
      if (currentInput === '0') {
        if (operator === '-') {
          const lastChar = expression.slice(-1);
          if (lastChar !== '-' && lastChar !== ' ') {
            let newExpression = expression + ` ${operator}`;
            this.setState({
              expression: newExpression,
              evaluated: false,
            });
          }
        } else {
          const lastChar = expression.slice(-1);
          if (lastChar !== ' ') {
            let newExpression = expression + ` ${operator}`;
            this.setState({
              expression: newExpression,
              evaluated: false,
            });
          }
        }
      } else {
        let newExpression = expression + ` ${currentInput} ${operator}`;
        this.setState({
          expression: newExpression,
          currentInput: '0',
          display: '0',
          evaluated: false,
        });
      }
    }
  };
  
  
  
  
  
  

  handleDecimalClick = () => {
    const { currentInput, evaluated } = this.state;
    if (!evaluated && currentInput.indexOf('.') === -1) {
      this.setState((prevState) => ({
        currentInput: prevState.currentInput + '.',
        display: prevState.display + '.',
      }));
    }
  };

  handleClearClick = () => {
    this.setState({
      display: '0',
      currentInput: '0',
      expression: '',
      evaluated: false,
    });
  };

  calculateResult = () => {
  const { expression, currentInput } = this.state;

  let fullExpression = expression + currentInput;

  try {
    fullExpression = fullExpression.replace(/,/g, '');
    const result = evaluate(fullExpression.replace(/(?<=[+\-*/])-(?=\d)/g, '+'));

    // Limitar la precisión del resultado a 4 decimales
    const roundedResult = parseFloat(result.toFixed(4));

    this.setState({
      display: roundedResult.toString(),
      currentInput: roundedResult.toString(),
      expression: '',
      evaluated: true,
    });
  } catch (error) {
    this.setState({
      display: 'Error',
      evaluated: true,
    });
  }
};


  
  
  
  
  
  
  

  render() {
    return (
      <div className="calculator">
        <div id="display">{this.state.display}</div>
        <div className="buttons">
          <button id="clear" onClick={this.handleClearClick}>
            AC
          </button>
          <button id="zero" onClick={() => this.handleNumberClick('0')}>
            0
          </button>
          <button id="one" onClick={() => this.handleNumberClick('1')}>
            1
          </button>
          <button id="two" onClick={() => this.handleNumberClick('2')}>
            2
          </button>
          <button id="three" onClick={() => this.handleNumberClick('3')}>
            3
          </button>
          <button id="four" onClick={() => this.handleNumberClick('4')}>
            4
          </button>
          <button id="five" onClick={() => this.handleNumberClick('5')}>
            5
          </button>
          <button id="six" onClick={() => this.handleNumberClick('6')}>
            6
          </button>
          <button id="seven" onClick={() => this.handleNumberClick('7')}>
            7
          </button>
          <button id="eight" onClick={() => this.handleNumberClick('8')}>
            8
          </button>
          <button id="nine" onClick={() => this.handleNumberClick('9')}>
            9
          </button>
          <button id="add" onClick={() => this.handleOperatorClick('+')}>
            +
          </button>
          <button id="subtract" onClick={() => this.handleOperatorClick('-')}>
            -
          </button>
          <button id="multiply" onClick={() => this.handleOperatorClick('*')}>
            *
          </button>
          <button id="divide" onClick={() => this.handleOperatorClick('/')}>
            /
          </button>
          <button id="decimal" onClick={this.handleDecimalClick}>
            .
          </button>
          <button id="equals" onClick={this.calculateResult}>
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;