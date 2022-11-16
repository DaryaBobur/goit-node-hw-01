const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname + "/db" + "/contacts.json");
const { v4 } = require('uuid');


const listContacts = async () => {
const dataContacts = await fs.readFile(contactsPath);
const contacts = JSON.parse(dataContacts);
console.log(contacts)
return contacts;
}
  
const getContactById = async (contactId) => {
const contacts = await listContacts();
const id = contacts.find(contact => contact.id === contactId);
if(!id){
    return null;
}
// console.log(id)
return id;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    const removeContact = contacts.splice(index, 1);
    if(index === -1){
        return null;
    }
    // console.log(removeContact);
    return removeContact;
}
  
const addContact = async (name, email, phone) => {
const contacts = await listContacts();
const newContact = {id: v4(), name, email, phone, }
contacts.push(newContact);
console.log(newContact)
return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}