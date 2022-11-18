const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
    const contacts = await listContacts();
    console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if(!contact){
        throw new Error(`Contact with id=${id} not found!`);
    }
    console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.log(deleteContact); 
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


// invokeAction({action: 'list'})
// invokeAction({action: 'get', id: "1"})
invokeAction({action: 'remove', id: '4473d7cb-e1ee-4b5e-933c-1f5393e4c527'})
// invokeAction({action: 'add', name: "Dasha", email: "bd@gmail.com", phone: "11111111111" })
// invokeAction(argv);
