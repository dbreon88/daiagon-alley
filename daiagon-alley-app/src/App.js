import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./views/home.js";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
