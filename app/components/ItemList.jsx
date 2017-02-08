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
        return <Item key={item.id} {...item}/>
      })
    }

    return (
      <div className="medium-6 large-6 columns callout">
        <h2>{title}</h2>
        {renderItems()}
      </div>
    )
  }
};

export default ItemList;