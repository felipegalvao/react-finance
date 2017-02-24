import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
var TestUtils = require('react-addons-test-utils');
import $ from 'jquery';

import ItemList from 'ItemList';
import Item from 'Item';

describe('ItemList', () => {
  it('should exist', () => {
    expect(ItemList).toExist();
  })

  it('should render one Item component for each item', () => {
    var items = [{
        id: 'abc123',
        itemDescription: 'test item 1',
        itemValue: 50.50,
        itemDate: 1487548800000,
        itemType: 'expense'
      },
      {
        id: 'def456',
        itemDescription: 'test item 2',
        itemValue: 100,
        itemDate: 1499999900000,
        itemType: 'expense'
      }]
      var totalValue = items[0].itemValue + items[1].itemValue;

      var itemList = TestUtils.renderIntoDocument(<ItemList items={items} title={"Expenses"} totalValue={totalValue} />);
      var itemsComponents = TestUtils.scryRenderedComponentsWithType(itemList, Item);

      expect(itemsComponents.length).toEqual(items.length);
  })

  it('should render a table with no item rows if no items', () => {
    var items = [];
    var totalValue = 0;
    var itemList = TestUtils.renderIntoDocument(<ItemList items={items} title={"Expenses"} totalValue={totalValue} />);

    var $el = $(ReactDOM.findDOMNode(itemList));
    var itemRows = $el.find('tbody tr');

    expect(itemRows.length).toEqual(0);
  })
})