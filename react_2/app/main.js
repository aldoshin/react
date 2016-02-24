(function() {
  /*
   * Constants
   */
  var CONTACT_TEMPLATE = {
    name: "",
    email: "",
    description: "",
    errors: null
  };

  /*
   * Model
   */
  var state = {};

  // Make the given changes to the state and perform any required housekeeping
  function setState(changes) {
    Object.assign(state, changes);
    ReactDOM.render(React.createElement(ContactView, Object.assign({}, state, {
      onContactChange: updateNewContact,
      onAddContact: addNewContact
    })), document.getElementById('react-app'));
  }

  // Set initial data
  setState({
    contacts: [{
      key: 1,
      name: "James K Nelson",
      email: "james@jamesknelson.com",
      description: "Front-end Unicorn"
    }, {
      key: 2,
      name: "Jim",
      email: "jim@example.com"
    }],
    newContact: Object.assign({}, CONTACT_TEMPLATE)
  });

  /*
   * Actions
   */
  function updateNewContact(contact) {
    setState({
      newContact: contact
    });
  }

  function addNewContact(contacts, newContact) {
    var contact = Object.assign({}, state.newContact, {
      key: state.contacts.length + 1,
      errors: {}
    });

    if (!contact.name) {
      contact.errors.name = ["Please enter your new contact's name"];
    }
    // Test that `contact.email` looks like a real e-mail address using a RegExp
    if (!/.+@.+\..+/.test(contact.email)) {
      contact.errors.email = ["Please enter your new contact's email"];
    }
    var newState = Object.keys(contact.errors).length === 0 ? {
      newContact: Object.assign({}, CONTACT_TEMPLATE),
      contacts: state.contacts.slice(0).concat(contact),
    } : {
      newContact: contact
    };

    setState(newState);
  }



})();
