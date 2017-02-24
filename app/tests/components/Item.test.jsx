import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
var TestUtils = require('react-addons-test-utils');
import $ from 'jquery';

import Item from 'Item';

describe('Item', () => {
  it('should exist', () => {
    expect(Item).toExist();
  })

  it('should call onDelete prop with item id on delete icon click', () => {
    var itemData = {
      id: 'abc123',
      itemDescription: 'test item',
      itemValue: 50.50,
      itemDate: 1487548800000,
      itemType: 'expense'
    };

    var spy = expect.createSpy();
    var item = TestUtils.renderIntoDocument(<Item key={itemData.id} {...itemData} onDelete={spy} />)
    var $el = $(ReactDOM.findDOMNode(item))

    TestUtils.Simulate.click($el.find('i')[0]);

    expect(spy).toHaveBeenCalledWith(itemData.id, itemData.itemDescription);
  })
})