import expect from 'expect';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
var TestUtils = require('react-addons-test-utils');
import $ from 'jquery';

import AddItem from 'AddItem';

describe('AddItem', () => {
  it('should exist', () => {
    expect(AddItem).toExist();
  })

  it('should call onAddItem with valid item data', () => {
    var item = {      
      itemDescription: 'test item',
      itemValue: 50.50,
      itemDate: 1487548800000,
      itemType: 'expense'
    };
    var spy = expect.createSpy();
    var addItem = TestUtils.renderIntoDocument(<AddItem onAddItem={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addItem));

    addItem.refs.itemDescription.value = item.itemDescription;
    addItem.refs.itemValue.value = item.itemValue;
    addItem.refs.itemDate.valueAsNumber = item.itemDate;
    addItem.refs.expense.checked = true;   

    TestUtils.Simulate.submit($el.find('form')[0]);        
    
    expect(spy).toHaveBeenCalledWith(item.itemDescription, String(item.itemValue), moment(item.itemDate).utc().unix(), item.itemType);
  })

  it('should not call onAddItem with invalid item data', () => {
    var item = {      
      itemDescription: '',
      itemValue: 50.50,
      itemDate: '1986-06-19',
      itemType: 'expense'
    };
    var spy = expect.createSpy();
    var addItem = TestUtils.renderIntoDocument(<AddItem onAddItem={spy}/>);
    var $el = $(ReactDOM.findDOMNode(addItem));

    addItem.refs.itemDescription.value = item.itemDescription;
    addItem.refs.itemValue.value = item.itemValue;
    addItem.refs.itemDate.value = item.itemDate;
    addItem.refs.expense.checked = true;    

    TestUtils.Simulate.submit($el.find('form')[0]);    
    
    expect(spy).toNotHaveBeenCalled();
  })
})