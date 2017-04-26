import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
const MockFirebase = require('firebase-mock').MockFirebase;
const TestUtils = require('react-addons-test-utils');
import $ from 'jquery';

import FinanceApp from 'FinanceApp';

describe('FinanceApp', () => {
  it('should exist', () => {
    expect(FinanceApp).toExist();
  })

  it('should add an item on handleAddItem', () => {
    const item = {
      userId: 'abc123',
      itemDescription: 'test item',
      itemValue: 50.50,
      itemDate: 1487548800000,
      itemType: 'expense'
    }

    const financeApp = TestUtils.renderIntoDocument(<FinanceApp/>);

    financeApp.setState({
      items:[],
      auth: {
        uid: 'abc123'
      }
    })

    financeApp.handleAddItem(item.itemDescription, item.itemValue, item.itemDate, item.itemType);

    expect(financeApp.state.items[0].itemDescription).toBe(item.itemDescription);
    expect(financeApp.state.items.length).toBe(1);
  }) 
})