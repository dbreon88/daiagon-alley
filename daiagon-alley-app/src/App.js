import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import Compound from "./views/Compound.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/compound" component={Compound} />
    </Router>
  );
}

export default App;
