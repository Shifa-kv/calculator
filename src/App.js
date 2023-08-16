import { useState } from 'react';
import './App.css';
function App() {
  const [Numbers, setNumber] = useState('')
  const [prevNumber, setPrevNumber] = useState(0)
  const [Operator, setOperator] = useState('')
  const [State, setState] = useState({ status: false, sum: 0, input: '' })
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const handleOperator = async (value) => {
    if (Operator !== '') {
      handleCalculate();
      setNumber('0')
    }
    else {
      setPrevNumber(Numbers);
      setNumber('0')
    }
    if (State.sum == 'Infinity' || isNaN(State.sum)) {
      setPrevNumber(0);
      setState({ sum: 0, input: Numbers + value, status: false });
    }
    else {
      setState((prevState) => ({ ...prevState, input: prevState.input + value, status: false }));
    }
    setOperator(value);
  }

  const handleInput = (value) => {
    if (value === '.' && Numbers.includes('.')) {
      return;
    }
    else if (State.status) {
      setNumber(value);
      setState((prevState) => ({ ...prevState, input: value.toString(), status: false }));
    }
    else {
      setNumber(Numbers.toString() + value);
      setState((prevState) => ({ ...prevState, input: prevState.input.toString() + value, status: false }));
    }
  }

  const handleCalculate = (method) => {
    if (Operator) {
      let sum;
      switch (Operator) {
        case '+':
          sum = parseFloat(prevNumber) + parseFloat(Numbers)
          break;
        case '-':
          sum = parseFloat(prevNumber) - parseFloat(Numbers)
          break;
        case '*':
          sum = parseFloat(prevNumber) * parseFloat(Numbers)
          break;
        case '/':
          sum = parseFloat(prevNumber) / parseFloat(Numbers)
          break;
        default:
          break;
      }
      if (method == '=') {
        setState({ sum, status: true, input: sum });
        setNumber(sum.toString());
        setPrevNumber('')
        setOperator('');
      }
      else {
        setPrevNumber(sum.toString())
      }
      if (sum == 'Infinity' || isNaN(sum)) {
        setPrevNumber(0);
        setNumber('');
      }
    }
  }

  return (
    <div className="App">
      <input
        type='text'
        name='values'
        className={State.status ? (State.sum == 'Infinity' || isNaN(State.sum) ? 'error' : 'result') : ''}
        placeholder='0'
        readOnly
        value={State.status ? State.sum : State.input}
      />
      <div className='buttonList'>
        <div className='numbers'>
          {
            values.map((number) => {
              return <button onClick={() => { handleInput(number) }} key={number}>{number}</button>
            })
          }
          <button onClick={() => { handleInput('0') }}>0</button>
          <button onClick={() => { handleInput('.') }}>.</button>
          <button onClick={() => { handleOperator('+') }}>+</button>
        </div>
        <div className='operations-left'>
          <button onClick={() => { handleOperator('/') }}>/</button>
          <button onClick={() => { handleOperator('*') }}>x</button>
          <button onClick={() => { handleOperator('-') }}>-</button>
          <button onClick={() => { handleCalculate('=') }}>
            =
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
