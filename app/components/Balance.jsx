import React from 'react';

var NumberFormat = require('react-number-format');

class Balance extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    var {expenseTotal, incomeTotal} = this.props;
    var balance = incomeTotal - expenseTotal;

    return (
      <div>        
        <div className="medium-12 large-12 columns">
          <h3>Balance: <NumberFormat value={parseFloat(balance).toFixed(2)} displayType={'text'} decimalSeparator={true} thousandSeparator={true} prefix={'$'} /></h3>
        </div>
      </div>
    )    
  }
}

export default Balance;