const contacts = require("./contacts");
contacts.listContacts();
contacts.getContactById("3");
contacts.removeContact("2")
contacts.addContact("Dasha","bd.@gmail.com","111111111111"
  )

module.exports = contacts;