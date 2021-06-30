import { Component } from "react";

/**
 * Imports Styling
 */
import "./Die.css";

/**
 * Displays the component
 */
class Die extends Component {
  /**
   * Defines the default props
   */
  static defaultProps = {
    numberWords: ["one", "two", "three", "four", "five", "six"],
    val: 5
  };

  /**
   * Handles locking die when clicked
   */
  handleClick = () => {
    this.props.handleClick(this.props.idx);
  };

  render() {
    const { numberWords, locked, val, disabled, rolling } = this.props;

    /**
     * Handles setting custom classes to the die
     * based on the props
     */
    let classes = `Die fas fa-dice-${numberWords[val - 1]} fa-5x `;
    if (locked) classes += "Die-locked";
    if (rolling) classes += "Die-rolling";

    return (
      <i className={classes} onClick={this.handleClick} disabled={disabled} />
    );
  }
}

export default Die;
