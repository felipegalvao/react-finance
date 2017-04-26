import React from "react";

import moment from "moment";
const uuid = require("node-uuid");

import AddItem from "AddItem";
import Balance from "Balance";
import FilterItem from "FilterItem";
import ItemList from "ItemList";
import Login from "Login";

class FinanceApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchItemText: "",
      filterDateFrom: null,
      filterDateTo: null,
      auth: {}
    };
  }

  componentWillMount() {
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.handleAppLogin(user.uid);

        const uid = that.state.auth.uid;

        const itemsRef = firebase
          .database()
          .ref("users/" + uid + "/items")
          .on("value", function(snapshot) {
            const items = snapshot.val() || {};
            let listItems = [];

            Object.keys(items).forEach(itemId => {
              listItems.push({
                id: itemId,
                ...items[itemId]
              });
            });

            that.setState({
              items: listItems
            });
          });
      } else {
        that.handleLogout();
      }
    });
  }

  handleAddItem = (itemDescription, itemValue, itemDate, itemType) => {
    const item = {
      userId: this.state.auth.uid,
      itemDescription: itemDescription,
      itemValue: itemValue,
      itemDate: itemDate,
      itemType: itemType
    };

    const uid = this.state.auth.uid;
    const firebaseRef = firebase.database().ref();
    const itemsRef = firebaseRef.child("users/" + uid + "/items").push(item);
  };

  handleDelete = (id, itemDescription) => {
    const confirmation = confirm(
      'Are you sure you want to delete "' + itemDescription + '"?'
    );
    if (confirmation) {
      const uid = this.state.auth.uid;
      firebase.database().ref("users/" + uid + "/items/" + id).remove();
    }
  };

  handleFilterByText = searchItemText => {
    this.setState({
      searchItemText
    });
  };

  handleFilterByDate = (dateFrom, dateTo) => {
    if (isNaN(dateFrom) || isNaN(dateTo)) {
      this.setState({
        filterDateFrom: null,
        filterDateTo: null
      });
    } else {
      this.setState({
        filterDateFrom: dateFrom,
        filterDateTo: dateTo
      });
    }
  };

  handleAppLogin = uid => {
    this.setState({
      auth: { uid: uid }
    });
  };

  handleGoogleLogin = () => {
    console.log("starting Google Login");

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        const user = result.user;
        console.log("Got user from Google: ", token);
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  };

  handleGithubLogin = () => {
    console.log("starting Github Login");

    const githubProvider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        console.log(error);
        // ...
      });
  };

  handleLogout = () => {
    console.log("starting logout");
    const that = this;
    const uid = this.state.auth.uid;
    firebase.database().ref("users/" + uid + "/items").off();
    firebase.auth().signOut().then(
      function() {
        console.log("logout successful");
        that.setState({
          items: [],
          auth: {}
        });
      },
      function(error) {
        console.log("Error signing out");
      }
    );
  };

  render() {
    const { items, searchItemText, filterDateFrom, filterDateTo } = this.state;

    let filteredItems;

    // Filter Items By Text
    if (searchItemText === "") {
      filteredItems = items;
    } else {
      filteredItems = items.filter(item => {
        const itemDescription = item.itemDescription.toLowerCase();
        return (
          searchItemText.length === 0 ||
          itemDescription.indexOf(searchItemText.toLowerCase()) > -1
        );
      });
    }

    // Filter Items By Date
    if (filterDateFrom === null && filterDateTo === null) {
      filteredItems = filteredItems;
    } else {
      filteredItems = filteredItems.filter(item => {
        const itemDate = item.itemDate;
        return itemDate >= filterDateFrom && itemDate <= filterDateTo;
      });
    }

    const expenses = filteredItems.filter(item => {
      return item.itemType === "expense";
    });

    const incomes = filteredItems.filter(item => {
      return item.itemType === "income";
    });

    let expenseTotal = 0;
    let incomeTotal = 0;

    // Calculate total of expenses and incomes
    for (let i = 0; i < expenses.length; i++) {
      expenseTotal += Number(expenses[i].itemValue);
    }

    for (let i = 0; i < incomes.length; i++) {
      incomeTotal += Number(incomes[i].itemValue);
    }

    const renderApp = () => {
      if (firebase.auth().currentUser) {
        return (
          <div>
            <div className="row row-add-item box-material">
              <AddItem onAddItem={this.handleAddItem} />
            </div>
            <div className="row row-filter box-material">
              <FilterItem
                onFilterByText={this.handleFilterByText}
                onFilterByDate={this.handleFilterByDate}
              />
            </div>
            <div className="row row-items box-material">
              <ItemList
                items={expenses}
                title={"Expenses"}
                totalValue={expenseTotal}
                onDelete={this.handleDelete}
              />
              <ItemList
                items={incomes}
                title={"Incomes"}
                totalValue={incomeTotal}
                onDelete={this.handleDelete}
              />
            </div>
            <div className="row row-balance box-material">
              <Balance expenseTotal={expenseTotal} incomeTotal={incomeTotal} />
            </div>
          </div>
        );
      } else {
        return (
          <div className="row">
            <div className="columns small-centered medium-12 large-12">
              <Login
                onGithubLogin={this.handleGithubLogin}
                onGoogleLogin={this.handleGoogleLogin}
                onLogout={this.handleLogout}
              />
            </div>
          </div>
        );
      }
    };

    const renderLogout = () => {
      if (firebase.auth().currentUser) {
        return <a className="p-logout" onClick={this.handleLogout}>Logout</a>;
      }
    };

    return (
      <div>
        {renderLogout()}
        <h1 className="text-center">React Finance App</h1>
        {renderApp()}
      </div>
    );
  }
}

export default FinanceApp;
