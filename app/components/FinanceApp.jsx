import React from 'react';

import moment from 'moment';
var uuid = require('node-uuid');

import AddItem from 'AddItem';
import Balance from 'Balance';
import FilterItem from 'FilterItem';
import ItemList from 'ItemList';
import Login from 'Login';

class FinanceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],      
      searchItemText: '',
      filterDateFrom: null,
      filterDateTo: null,
      auth: {}
    };

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFilterByText = this.handleFilterByText.bind(this);
    this.handleFilterByDate = this.handleFilterByDate.bind(this);
    this.handleGithubLogin = this.handleGithubLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleAppLogin = this.handleAppLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.handleAppLogin(user.uid);

        var uid = that.state.auth.uid;
        var itemsRef = firebase.database().ref('users/' + uid + '/items');
        
        itemsRef.on('value', function(snapshot) {
          var items = snapshot.val() || {};
          var listItems = [];

          Object.keys(items).forEach((itemId) => {
            listItems.push({
              id: itemId,
              ...items[itemId]
            });
          })          

          that.setState({
            items: listItems
          });
        });
      } else {
        that.handleLogout();
      }
    });    
  }  

  handleAddItem (itemDescription, itemValue, itemDate, itemType) {        
    var item = {      
      userId: this.state.auth.uid,
      itemDescription: itemDescription,
      itemValue: itemValue,
      itemDate: itemDate,
      itemType: itemType
    }    

    var uid = this.state.auth.uid;
    var firebaseRef = firebase.database().ref();
    var itemsRef = firebaseRef.child('users/' + uid + '/items').push(item);
  }

  handleDelete (id, itemDescription) {
    var confirmation = confirm('Are you sure you want to delete "' + itemDescription + '"?');
    if (confirmation) {      
      var uid = this.state.auth.uid;      
      firebase.database().ref('users/' + uid + '/items/' + id).remove();
    }     
  }

  handleFilterByText (searchItemText) {
    this.setState({
      searchItemText
    })
  }

  handleFilterByDate (dateFrom, dateTo) {
    if (isNaN(dateFrom) || isNaN(dateTo)) {
      this.setState({
        filterDateFrom: null,
        filterDateTo: null
      })
    } else {
      this.setState({
        filterDateFrom: dateFrom,
        filterDateTo: dateTo
      })
    }    
  }

  handleAppLogin (uid) {
    this.setState({
      auth: { uid: uid }
    });
  }

  handleGoogleLogin () {
    console.log('starting Google Login');

    var googleProvider = new firebase.auth.GoogleAuthProvider();    

    firebase.auth().signInWithPopup(googleProvider).then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      console.log('Got user from Google: ', token);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  handleGithubLogin () {
    console.log('starting Github Login');

    var githubProvider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(githubProvider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error)
      // ...
    });
  }

  handleLogout () {
    console.log('starting logout');
    var that = this;
    firebase.auth().signOut().then(function() {
      console.log('logout successful');
      that.setState({
        auth: {}
      });
    }, function(error) {
      // An error happened.
    });
  }

  render() {
    var {items, searchItemText, filterDateFrom, filterDateTo} = this.state;

    // Filter Items By Text
    if (searchItemText === '') {
      var filteredItems = items;
    } else {
      var filteredItems = items.filter((item) => {
        var itemDescription = item.itemDescription.toLowerCase();
        return searchItemText.length === 0 || itemDescription.indexOf(searchItemText.toLowerCase()) > -1;        
      })
    }

    // Filter Items By Date
    if (filterDateFrom === null && filterDateTo === null) {
      var filteredItems = filteredItems;
    } else {
      var filteredItems = filteredItems.filter((item) => {
        var itemDate = item.itemDate;
        return itemDate >= filterDateFrom && itemDate <= filterDateTo;
      })
    }

    var expenses = filteredItems.filter((item) => {
      return item.itemType === 'expense';
    })

    var incomes = filteredItems.filter((item) => {
      return item.itemType === 'income';
    })

    var expenseTotal = 0;
    var incomeTotal = 0;

    // Calculate total of expenses and incomes
    for (var i=0; i < expenses.length; i++) {
      expenseTotal += Number(expenses[i].itemValue);
    }

    for (var i=0; i < incomes.length; i++) {
      incomeTotal += Number(incomes[i].itemValue);
    }

    var balance = incomeTotal - expenseTotal;

    return (
      <div>
        <div className="row">
          <div className="columns small-centered medium-8 large-8">
            <h1 className="text-center">React Finance App</h1>
            <Login onGithubLogin={ this.handleGithubLogin } onGoogleLogin={ this.handleGoogleLogin } onLogout={ this.handleLogout }/>
          </div>
        </div>
        <div className="row">
          <div className="columns small-centered medium-8 large-8">
            <AddItem onAddItem={this.handleAddItem}/>
            <FilterItem onFilterByText={this.handleFilterByText} onFilterByDate={this.handleFilterByDate} />
          </div>
        </div>
        <div className="row">
          <div className="columns small-centered medium-8 large-8">
            <ItemList items={expenses} title={"Expenses"} onDelete={ this.handleDelete }/>
            <ItemList items={incomes} title={"Incomes"} onDelete={ this.handleDelete }/>
          </div>
        </div>
        <div className="row">
          <div className="columns small-centered medium-8 large-8">
            <Balance expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
          </div>
        </div>
      </div>
    )
  }
}

export default FinanceApp;