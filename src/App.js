import { Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counter'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/product/1">Product</Link>
		   <div>
			<button
			  aria-label="Increment value"
			  onClick={() => dispatch(increment())}
			>
			  Increment
			</button>
			<span>{count}</span>
			<button
			  aria-label="Decrement value"
			  onClick={() => dispatch(decrement())}
			>
			  Decrement
			</button>
		  </div>
      </header>
    </div>
  );
}

export default App;
