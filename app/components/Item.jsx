import React from 'react';
import moment from 'moment';

class Item extends React.Component{
  // An item can be an income or an expense
  constructor(props) {
    super(props);
  }

  render() {
    var {id, itemDescription, itemValue, itemDate} = this.props;

    return (
      <div>
        {moment.unix(itemDate).utc().format('DD/MM/YYYY')} - {itemDescription} - {itemValue}
      </div>
    )
  }
};

export default Item;