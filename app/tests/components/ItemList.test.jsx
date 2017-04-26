import expect from 'expect';
import React from 'react';
import ReactDOM from 'react-dom';
const TestUtils = require('react-addons-test-utils');
import $ from 'jquery';

import ItemList from 'ItemList';
import Item from 'Item';

describe('ItemList', () => {
  it('should exist', () => {
    expect(ItemList).toExist();
  })

  it('should render one Item component for each item', () => {
    const items = [{
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
      const totalValue = items[0].itemValue + items[1].itemValue;

      const itemList = TestUtils.renderIntoDocument(<ItemList items={items} title={"Expenses"} totalValue={totalValue} />);
      const itemsComponents = TestUtils.scryRenderedComponentsWithType(itemList, Item);

      expect(itemsComponents.length).toEqual(items.length);
  })

  it('should render a table with no item rows if no items', () => {
    const items = [];
    const totalValue = 0;
    const itemList = TestUtils.renderIntoDocument(<ItemList items={items} title={"Expenses"} totalValue={totalValue} />);

    const $el = $(ReactDOM.findDOMNode(itemList));
    const itemRows = $el.find('tbody tr');

    expect(itemRows.length).toEqual(0);
  })
})