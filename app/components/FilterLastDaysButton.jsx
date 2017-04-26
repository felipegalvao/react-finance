import React, { Component } from "react";

class FilterLastDaysButton extends Component {
  constructor(props) {
    super(props);    
  }

  handleFilterLastDays = () => {
    this.props.onFilterLastDays(this.props.days);
  }

  render() {
    const { days } = this.props;

    return (
      <button className="button" onClick={this.handleFilterLastDays}>
        {days} days
      </button>
    );
  }
}

export default FilterLastDaysButton;
