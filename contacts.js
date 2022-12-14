const { v4 } = require('uuid');
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname + "/db" + "/contacts.json");

const listContacts = async () => {
    try {
        const dataContacts = await fs.readFile(contactsPath);
        const contacts = JSON.parse(dataContacts);
        return contacts;
    } catch (error) {
        console.log(error.message);
    }
}
  
const getContactById = async (contactId) => {

    try {
        const contacts = await listContacts();
        const id = contacts.find(contact => contact.id === contactId);
        if(!id){
            return null;
        }
        return id;
    } catch (error) {
        console.log(error.message);
    }
    
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === contactId);
        
        if(index === -1){
            return null;
        }

        const [removeContactData] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return removeContactData;
    } catch (error) {
        console.log(error.message);
    }
    
}
  
const addContact = async (name, email, phone) => {
    try {
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
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}