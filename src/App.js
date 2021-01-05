import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Admin from "./components/admin/Admin";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/admin" exact component={Admin} />
    </Router>
  );
}

export default App;
