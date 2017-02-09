import React, { Component } from 'react';
import FilterLastDaysButton from 'FilterLastDaysButton';
import moment from 'moment';

class FilterItem extends Component {
  constructor(props) {
    super(props);
    this.handleFilterByText = this.handleFilterByText.bind(this);
    this.handleFilterByDate = this.handleFilterByDate.bind(this);
    this.handleFilterLastDays = this.handleFilterLastDays.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
  }

  handleClearFilter (e) {
    e.preventDefault();
    this.refs.toDateFilter.value = '';
    this.refs.fromDateFilter.value = '';
    this.handleFilterByDate(e);
  }

  handleFilterByText () {
    var searchItemText = this.refs.searchItemText.value;
    this.props.onFilterByText(searchItemText);
  }

  handleFilterLastDays (days) {
    this.refs.toDateFilter.value = moment().format('YYYY-MM-DD');
    this.refs.fromDateFilter.value = moment().subtract(days-1, 'days').format('YYYY-MM-DD');
  }

  handleFilterByDate (e) {
    e.preventDefault();    
    var dateFrom = moment(this.refs.fromDateFilter.valueAsDate).unix();    
    var dateTo = moment(this.refs.toDateFilter.valueAsDate).unix();    
    this.props.onFilterByDate(dateFrom, dateTo);
  }
  
  render() {
    var possibleDays = [3, 7, 15, 30];

    var renderFilterLastDaysButtons = () => {
      return possibleDays.map((day) => {
        return <FilterLastDaysButton days={day} onFilterLastDays={this.handleFilterLastDays} key={day} />
      })
    }
    
    return (
      <div className="medium-6 large-6 columns callout">
        <h4>Filter</h4>
        <div>
          <input type="text" ref="searchItemText" placeholder="Filter incomes and expenses" onChange={this.handleFilterByText} />
          <p>Filter the last:</p>
          {renderFilterLastDaysButtons()}
          <p>Date Range</p>
          <form onSubmit={this.handleFilterByDate} ref="formFilterDate">
            <label>From<input type="date" ref="fromDateFilter" placeholder="Filter incomes and expenses from" /></label>
            <label>To<input type="date" ref="toDateFilter" placeholder="Filter incomes and expenses to" /></label>
            <input type="submit" className="button" value="Filter Dates" />
            <button className="button" onClick={this.handleClearFilter}>Clear Filter</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FilterItem;