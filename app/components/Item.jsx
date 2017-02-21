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
      <tr>
        <td>{moment.unix(itemDate).utc().format('DD/MM/YYYY')}</td>
        <td>{itemDescription}</td>
        <td>{itemValue}</td>
        <td onClick={() => {this.props.onDelete(id, itemDescription)}}><i className="fa fa-trash" aria-hidden="true"></i></td>
      </tr>
    )
  }
};

export default Item;