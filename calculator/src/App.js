import "./styles.css"
import React, {useReducer} from 'react';
import DigitButton from './DigitButton.js'
import OperationButton from "./OperationButton.js";

function reducer(state, action) {
  switch (action.type) {
    case "ADD-DIGIT":
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: action.value
        };
      }

      if (action.value === "." && state.currentOperand.includes(".")) return state;

      if (action.value === "0" && state.currentOperand === "0") return state;

      if (state.currentOperand === "0" && action.value !== ".") {
        return {
          ...state,
          currentOperand: action.value
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand + action.value
      }
    case "ADD-OPERATION":
      if (action.value === "-" && state.currentOperand === "") {
        return {
          ...state,
          currentOperand: "-",
          overwite: false
        }
      }
      if (state.currentOperand === "" || state.currentOperand === "-") return state;

      if (state.previousOperand === "") {
        return {
          ...state,
          previousOperand: `${state.currentOperand} ${action.value}`,
          currentOperand: ""
        };
      }

      return {
        ...state,
        previousOperand: `${evaluate(state.previousOperand, state.currentOperand)} ${action.value}`,
        currentOperand: ""
      };

    case "CLEAR":
      if (state.currentOperand === "") {
        return {currentOperand: "", previousOperand: ""};
      }

      return {
        ...state,
        currentOperand: ""
      };

    case "DELETE":
      if (state.currentOperand === "Infinity" || state.currentOperand === "NaN") {
        return {
          ...state,
          currentOperand: ""
        }
      }
      if (state.currentOperand !== "") {
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
          overwrite: false
        }
      }
      
      if (state.previousOperand === "") return state;

      return {
        ...state,
        currentOperand: state.previousOperand.slice(0, -2),
        previousOperand: ""  
      };

    case "EQUAL":
      if (state.currentOperand === "" || state.previousOperand === "") return state;

      return {
        ...state,
        currentOperand: evaluate(state.previousOperand, state.currentOperand),
        previousOperand: "",
        overwrite: true
      }
  }
}

function evaluate(prev, cur) {
  const parts = prev.split(" ");
  const first = parseFloat(parts[0]);
  const operation = parts[1];
  const second = parseFloat(cur);

  switch (operation) {
    case "÷":
      return (first / second).toString();
    case "+":
      return (first + second).toString();
    case "-":
      return (first - second).toString();
    case "*":
      return (first * second).toString();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {currentOperand: "", previousOperand: "", overwrite: false})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{state.previousOperand}</div>
        <div className="current-operand">{state.currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => {dispatch({type: "CLEAR"})}}>AC</button>
      <button onClick={() => {dispatch({type: "DELETE"})}}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => {dispatch({type: "EQUAL"})}}>=</button>
    </div>
  );
}

export default App;
