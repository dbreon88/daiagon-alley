import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import History from "./views/History.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/history" component={History} />
    </Router>
  );
}

export default App;
