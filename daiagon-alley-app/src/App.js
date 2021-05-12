import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./views/Home";
import History from "./views/History.js";
import NavBar from "./components/NavBar.js";

function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route path="/history" component={History} />
    </Router>
  );
}

export default App;
