import React from 'react';
import ItemList from 'ItemList';
import Balance from 'Balance';
import AddItem from 'AddItem';
import moment from 'moment';
var uuid = require('node-uuid');

class FinanceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      expenseTotal: 0.00,
      incomeTotal: 0.00,
      balance: 0.00,
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAddItem (itemDescription, itemValue, itemDate, itemType) {    
    console.log(moment.unix(itemDate).format('DD/MM/YYYY'))
    this.setState({
      items: [
        ...this.state.items,
        {
          id: uuid(),
          itemDescription: itemDescription,
          itemValue: itemValue,
          itemDate: itemDate,
          itemType: itemType
        }
      ]
    })    
    if (itemType === 'expense') {
      this.setState({ expenseTotal: Number(this.state.expenseTotal) + Number(itemValue) })
    } else if (itemType === 'income') {
      this.setState({ incomeTotal: Number(this.state.incomeTotal) + Number(itemValue) })
    }
    this.setState({ balance: this.state.incomeTotal - this.state.expenseTotal })
  }

  handleDelete (id, itemDescription) {
    var confirmation = confirm('Are you sure you want to delete "' + itemDescription + '"?');
    if (confirmation) {
      var newItems = this.state.items.filter((item) => {
        return item.id !== id;
      })
      this.setState({
        items: newItems
      })
    }     
  }

  render() {
    var {items, expenseTotal, incomeTotal, balance} = this.state;    

    var expenses = items.filter((item) => {
      return item.itemType === 'expense';
    })

    var incomes = items.filter((item) => {
      return item.itemType === 'income';
    })

    return (
      <div>
        <div className="row">
          <div className="column small-centered medium-8 large-8">
            <h1 className="text-center">React Finance App</h1>
          </div>
        </div>
        <div className="row">
          <div className="column small-centered medium-8 large-8">
            <AddItem onAddItem={this.handleAddItem}/>          
          </div>
        </div>
        <div className="row">
          <div className="column small-centered medium-8 large-8">
            <ItemList items={expenses} title={"Expenses"} onDelete={ this.handleDelete }/>
            <ItemList items={incomes} title={"Incomes"} onDelete={ this.handleDelete }/>
          </div>
        </div>
        <div className="row">
          <div className="column small-centered medium-8 large-8">
            <Balance expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
          </div>
        </div>
      </div>
    )
  }
}

export default FinanceApp;