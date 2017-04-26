import React from "react";

const NumberFormat = require("react-number-format");

class Balance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { expenseTotal, incomeTotal } = this.props;
    const balance = incomeTotal - expenseTotal;

    return (
      <div>
        <div className="medium-12 large-12 columns">
          <h3>
            Balance:
            {" "}
            {balance < 0 ? "-" : ""}
            {" "}
            <NumberFormat
              value={parseFloat(balance).toFixed(2)}
              displayType={"text"}
              decimalSeparator={true}
              thousandSeparator={true}
              prefix={"$"}
            />
          </h3>
        </div>
      </div>
    );
  }
}

export default Balance;
