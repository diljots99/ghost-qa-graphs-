import logo from './logo.svg';
import './App.css';
import ChartComponent from './ChartComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <ChartComponent  />
    </div>
  );

  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="" component={ChartComponent} />
  //     </Routes>
  //   </Router>
  // );
}

export default App;
