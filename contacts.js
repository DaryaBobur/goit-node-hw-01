const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname + "/db" + "/contacts.json");
const { v4 } = require('uuid');


const listContacts = async () => {
const dataContacts = await fs.readFile(contactsPath);
const contacts = JSON.parse(dataContacts);
return contacts;
}
  
const getContactById = async (contactId) => {
const contacts = await listContacts();
const idContact = contacts.find(contact => contact.id === contactId);
if(!idContact){
    return null;
}
return idContact;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    
    if(index === -1){
        return null;
    }
    const [removeContactData] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContactData;
}
  
const addContact = async (name, email, phone) => {
const contacts = await listContacts();

const newContact = { 
    id: v4(),
    name, 
    email, 
    phone, 
};


contacts.push(newContact);
await fs.writeFile(contactsPath, JSON.stringify(contacts));


return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}