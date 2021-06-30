import { Component } from "react";

/**
 * Imports components
 */
import Dice from "../Dice";
import ScoreTable from "../ScoreTable";

/**
 * Imports Styling
 */
import "./Game.css";

/**
 * Defines the play style
 * Number of dice: n
 * Number of rolls: n
 */
const NUM_DICE = 5;
const NUM_ROLLS = 3;

/**
 * Displays the component
 */
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
  }

  componentDidMount() {
    this.animateRoll();
  }

  /**
   * Handles animating the dice when rolled
   */
  animateRoll = () => {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  };

  /**
   * Handles rolling the dice whose indexes are in reroll
   */
  roll = (e) => {
    this.setState((st) => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false
    }));
  };

  /**
   * Toggle whether idx is in locked or not
   */
  toggleLocked = (idx) => {
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      this.setState((st) => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  };

  /**
   * Evaluates this ruleFn with the dice and score this rulename
   */
  doScore = (rulename, ruleFn) => {
    this.setState((st) => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false)
    }));
    this.animateRoll();
  };

  /**
   * Handles displaying messages
   */
  displayRollInfo() {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round"
    ];
    return messages[this.state.rollsLeft];
  }

  render() {
    const { dice, locked, rollsLeft, rolling, scores } = this.state;

    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="App-title">Yahtzee!</h1>
          <section className="Game-dice-section">
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              disabled={rollsLeft === 0}
              rolling={rolling}
            />
            <div className="Game-button-wrapper">
              <button
                className="Game-reroll"
                disabled={locked.every((x) => x) || rollsLeft === 0 || rolling}
                onClick={this.animateRoll}
              >
                {this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={scores} />
      </div>
    );
  }
}

export default Game;
