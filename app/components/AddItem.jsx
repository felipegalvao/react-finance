import React from 'react';
import moment from 'moment';

class AddItem extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    var itemDescription = this.refs.itemDescription.value;
    var itemValue = this.refs.itemValue.value;
    console.log(this.refs.itemDate.valueAsDate);    
    var itemDate = moment(this.refs.itemDate.valueAsDate).unix();
    this.refs.itemDescription.value = '';
    this.refs.itemValue.value = ''
    this.refs.itemDate.value = ''
    if (this.refs.expense.checked) {
      var itemType = 'expense';
    } else if (this.refs.income.checked) {
      var itemType = 'income';
    }
    this.props.onAddItem(itemDescription, itemValue, itemDate, itemType);
  }

  render() {
    return (
      <div className="medium-12 large-12 columns callout">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="itemDescription" placeholder="Insert an income / expense here"/>
          <input type="number" ref="itemValue" placeholder="Insert value of income / expense here"/>
          <input type="date" ref="itemDate" placeholder="Insert the date when the income / expense occurred"/>
          <label><input type="radio" name="type" ref="expense" value="expense" defaultChecked /> Expense</label>
          <label><input type="radio" name="type" ref="income" value="income" /> Income</label>
          <input type="submit" value="Register Income / Expense" className="success button" />
        </form>
      </div>
    );
  }
}

export default AddItem;