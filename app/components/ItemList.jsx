import React from 'react';
import Item from 'Item';

class ItemList extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    var {items, title} = this.props;
    var renderItems = () => {
      return items.map((item) => {
        return <Item key={item.id} {...item} onDelete={ this.props.onDelete } />
      })
    }

    return (
      <div className="medium-6 large-6 columns callout">
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
        </table>
      </div>
    )
  }
};

export default ItemList;