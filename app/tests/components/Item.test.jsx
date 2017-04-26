import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
const TestUtils = require('react-addons-test-utils');
import $ from 'jquery';

import Item from 'Item';

describe('Item', () => {
  it('should exist', () => {
    expect(Item).toExist();
  })

  it('should call onDelete prop with item id on delete icon click', () => {
    const itemData = {
      id: 'abc123',
      itemDescription: 'test item',
      itemValue: 50.50,
      itemDate: 1487548800000,
      itemType: 'expense'
    };

    const spy = expect.createSpy();
    const item = TestUtils.renderIntoDocument(<Item key={itemData.id} {...itemData} onDelete={spy} />)
    const $el = $(ReactDOM.findDOMNode(item))

    TestUtils.Simulate.click($el.find('i')[0]);

    expect(spy).toHaveBeenCalledWith(itemData.id, itemData.itemDescription);
  })
})