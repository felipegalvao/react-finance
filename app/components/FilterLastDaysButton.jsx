import React, { Component } from 'react';

class FilterLastDaysButton extends Component {
  constructor(props) {
    super(props);
    this.handleFilterLastDays = this.handleFilterLastDays.bind(this);
  }

  handleFilterLastDays () {
    this.props.onFilterLastDays(this.props.days);
  }
  
  render() {
    var {days} = this.props;

    return (      
      <button className="button" onClick={this.handleFilterLastDays}>{days} days</button>      
    );
  }
}

export default FilterLastDaysButton;