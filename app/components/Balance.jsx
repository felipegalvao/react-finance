import React from 'react';

class Balance extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    var {expenseTotal, incomeTotal} = this.props;
    var balance = incomeTotal - expenseTotal;

    return (
      <div>
        <div className="medium-6 large-6 columns">
          <p>Total: {expenseTotal}</p>
        </div>
        <div className="medium-6 large-6 columns">
          <p>Total: {incomeTotal}</p>
        </div>

        <div className="medium-12 large-12 columns">
          <p>Balance: {balance}</p>
        </div>
      </div>
    )    
  }
}

export default Balance;