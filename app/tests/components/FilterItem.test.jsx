import expect from 'expect';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
var TestUtils = require('react-addons-test-utils');
import $ from 'jquery';

import FilterItem from 'FilterItem';

describe('FilterItem', () => {
  it('FilterItem', () => {
    expect(FilterItem).toExist();
  })

  it('should call onFilterByText when text is inputed', () => {
    var filterText = 'food';
    var spy = expect.createSpy();
    var filterItem = TestUtils.renderIntoDocument(<FilterItem onFilterByText={spy}/>);
    var $el = $(ReactDOM.findDOMNode(filterItem));
    filterItem.setState({filterVisible: true});

    filterItem.refs.searchItemText.value = filterText;
    TestUtils.Simulate.change(filterItem.refs.searchItemText);

    expect(spy).toHaveBeenCalledWith('food');
  })

  it('should call onFilterByDate when dates are provided', () => {
    var dateFrom = 1487548800000;
    var dateTo = 1487549900000;    
    var spy = expect.createSpy();
    var filterItem = TestUtils.renderIntoDocument(<FilterItem onFilterByDate={spy}/>);
    filterItem.setState({filterVisible: true});
    var $el = $(ReactDOM.findDOMNode(filterItem));
    
    filterItem.refs.fromDateFilter.valueAsNumber = dateFrom;
    filterItem.refs.toDateFilter.valueAsNumber = dateTo;    
    
    TestUtils.Simulate.submit($el.find('form')[0]);

    console.log(spy.calls[0].arguments);

    expect(spy).toHaveBeenCalledWith(moment(dateFrom).utc().unix(), moment(dateTo).utc().unix());
  })
})