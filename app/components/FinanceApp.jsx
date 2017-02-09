import React from 'react';

import AddItem from 'AddItem';
import Balance from 'Balance';
import ItemList from 'ItemList';
import FilterItem from 'FilterItem';

import moment from 'moment';
var uuid = require('node-uuid');

class FinanceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],      
      searchItemText: '',
      filterDateFrom: null,
      filterDateTo: null
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFilterByText = this.handleFilterByText.bind(this);
    this.handleFilterByDate = this.handleFilterByDate.bind(this);
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

  handleFilterByText (searchItemText) {
    this.setState({
      searchItemText
    })
  }

  handleFilterByDate (dateFrom, dateTo) {
    this.setState({
      filterDateFrom: dateFrom,
      filterDateTo: dateTo
    })
  }

  render() {
    var {items, searchItemText, filterDateFrom, filterDateTo} = this.state;

    // Filter Items By Text
    if (searchItemText === '') {
      var filteredItems = items;
    } else {
      var filteredItems = items.filter((item) => {
        var itemDescription = item.itemDescription.toLowerCase();
        return searchItemText.length === 0 || itemDescription.indexOf(searchItemText.toLowerCase()) > -1;        
      })
    }

    // Filter Items By Date
    if (filterDateFrom === null && filterDateTo === null) {
      var filteredItems = filteredItems;
    } else {
      var filteredItems = filteredItems.filter((item) => {
        var itemDate = item.itemDate;
        return itemDate > filterDateFrom && itemDate < filterDateTo;
      })
    }

    var expenses = filteredItems.filter((item) => {
      return item.itemType === 'expense';
    })

    var incomes = filteredItems.filter((item) => {
      return item.itemType === 'income';
    })

    var expenseTotal = 0;
    var incomeTotal = 0;

    // Calculate total of expenses and incomes
    for (var i=0; i < expenses.length; i++) {
      expenseTotal += Number(expenses[i].itemValue);
    }

    for (var i=0; i < incomes.length; i++) {
      incomeTotal += Number(incomes[i].itemValue);
    }

    var balance = incomeTotal - expenseTotal;

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
            <FilterItem onFilterByText={this.handleFilterByText} onFilterByDate={this.handleFilterByDate} />
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