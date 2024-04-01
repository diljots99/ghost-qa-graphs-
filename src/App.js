import logo from './logo.svg';
import './App.css';
import ChartComponent from './ChartComponent';
const data = [
  {
    "timeStamp": 1711978693306,
    "elapsed": 1607,
    "label": "home_page",
    "responseCode": 200,
    "responseMessage": "OK",
    "threadName": "Login_Script-ThreadStarter 1-22",
    "dataType": "text",
    "success": true,
    "failureMessage": null,
    "bytes": 8197,
    "sentBytes": 115,
    "grpThreads": 70,
    "allThreads": 70,
    "URL": "https://flooded.io/",
    "Latency": 1583,
    "IdleTime": 0,
    "Connect": 1094
  },
  {
    "timeStamp": 1711978692569,
    "elapsed": 2335,
    "label": "home_page",
    "responseCode": 200,
    "responseMessage": "OK",
    "threadName": "Login_Script-ThreadStarter 1-3",
    "dataType": "text",
    "success": true,
    "failureMessage": null,
    "bytes": 8197,
    "sentBytes": 115,
    "grpThreads": 70,
    "allThreads": 70,
    "URL": "https://flooded.io/",
    "Latency": 2329,
    "IdleTime": 0,
    "Connect": 1828
  }
];
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
      <ChartComponent data={data} />
    </div>
  );
}

export default App;
