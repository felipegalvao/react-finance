import React from 'react';
import Item from 'Item';

const NumberFormat = require('react-number-format');

class ItemList extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const {items, title, totalValue} = this.props;
    const renderItems = () => {
      return items.map((item) => {
        return <Item key={item.id} {...item} onDelete={ this.props.onDelete } />
      })
    }

    return (
      <div className="medium-6 large-6 columns">
        <h4>{title}</h4>
        <table className="table-itemlist">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Value</th>
              <th>Remove</th>              
            </tr>
          </thead>
          <tbody>
            {renderItems()}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>Total:</td>
              <td><NumberFormat value={parseFloat(totalValue).toFixed(2)} displayType={'text'} decimalSeparator={true} thousandSeparator={true} prefix={'$'} /></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
};

export default ItemList;