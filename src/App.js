import { Component } from "react";

/**
 * Imports component
 */
import Game from "../src/components/Game";

/**
 * Imports Styling
 */
import "./App.css";

/**
 * Displays the component
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
