import React, { Component } from "react";
import FilterLastDaysButton from "FilterLastDaysButton";
import moment from "moment";

class FilterItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterVisible: false
    };
  }

  handleClearFilter = e => {
    e.preventDefault();
    this.refs.toDateFilter.value = "";
    this.refs.fromDateFilter.value = "";
    this.handleFilterByDate(e);
  };

  handleFilterByText = () => {
    var searchItemText = this.refs.searchItemText.value;
    this.props.onFilterByText(searchItemText);
  };

  handleFilterLastDays = days => {
    this.refs.toDateFilter.value = moment().format("YYYY-MM-DD");
    this.refs.fromDateFilter.value = moment()
      .subtract(days - 1, "days")
      .format("YYYY-MM-DD");
  };

  handleFilterByDate = e => {
    e.preventDefault();
    var dateFrom = moment(this.refs.fromDateFilter.valueAsDate).unix();
    var dateTo = moment(this.refs.toDateFilter.valueAsDate).unix();
    this.props.onFilterByDate(dateFrom, dateTo);
  };

  handleShowHideFilter = () => {
    this.setState({
      filterVisible: !this.state.filterVisible
    });
  };

  render() {
    const possibleDays = [3, 7, 15, 30];

    const renderFilterLastDaysButtons = () => {
      return possibleDays.map(day => {
        return (
          <FilterLastDaysButton
            days={day}
            onFilterLastDays={this.handleFilterLastDays}
            key={day}
          />
        );
      });
    };

    const renderShowHideFilterButton = () => {
      if (this.state.filterVisible) {
        return (
          <i
            className="fa fa-minus-square-o icon-hide-show-filter"
            aria-hidden="true"
            onClick={this.handleShowHideFilter}
          />
        );
      } else {
        return (
          <i
            className="fa fa-plus-square-o icon-hide-show-filter"
            aria-hidden="true"
            onClick={this.handleShowHideFilter}
          />
        );
      }
    };

    const renderFilter = () => {
      if (this.state.filterVisible) {
        return (
          <div id="wrapper-filter-box">
            <div className="row">
              <div className="medium-6 large-6 columns">
                <p>Filter by text:</p>
                <input
                  type="text"
                  ref="searchItemText"
                  placeholder="Filter incomes and expenses"
                  onChange={this.handleFilterByText}
                />
              </div>
            </div>
            <div className="row">
              <div className="medium-12 large-12 columns">
                <p>Dates</p>
              </div>

              <div className="medium-4 large-4 columns column-filter-last-days">
                <p>Filter the last:</p>
                {renderFilterLastDaysButtons()}
              </div>
              <div className="medium-8 large-8 columns">
                <form onSubmit={this.handleFilterByDate} ref="formFilterDate">
                  <div className="medium-4 large-4 columns">
                    <p><label htmlFor="id-fromDateFilter">From</label></p>
                    <p>
                      <input
                        id="id-fromDateFilter"
                        type="date"
                        ref="fromDateFilter"
                        placeholder="Filter incomes and expenses from"
                      />
                    </p>
                  </div>

                  <div className="medium-4 large-4 columns">
                    <p><label htmlFor="id-toDateFilter">To</label></p>
                    <p>
                      <input
                        id="id-toDateFilter"
                        type="date"
                        ref="toDateFilter"
                        placeholder="Filter incomes and expenses to"
                      />
                    </p>
                  </div>

                  <div className="medium-2 large-2 columns">
                    <input
                      type="submit"
                      className="button button-apply-filter"
                      value="Filter"
                    />
                  </div>

                  <div className="medium-2 large-2 columns">
                    <button
                      className="button button-clear-filter"
                      onClick={this.handleClearFilter}
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div className="medium-12 large-12 columns">
        <h4>Filter {renderShowHideFilterButton()}</h4>
        {renderFilter()}
      </div>
    );
  }
}

export default FilterItem;
