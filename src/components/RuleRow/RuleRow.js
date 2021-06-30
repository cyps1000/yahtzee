import { Component } from "react";

/**
 * Imports Styling
 */
import "./RuleRow.css";

/**
 * Displays the component
 */
class RuleRow extends Component {
  render() {
    const { score, name, doScore, description } = this.props;
    const disabled = score !== undefined;

    return (
      <tr
        className={`RuleRow RuleRow-${disabled ? "disabled" : "active"}`}
        onClick={disabled ? null : doScore}
      >
        <td className="RuleRow-name">{name}</td>
        <td className="RuleRow-score">{disabled ? score : description}</td>
      </tr>
    );
  }
}

export default RuleRow;
