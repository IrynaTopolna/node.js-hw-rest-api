const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const updateContactsList = async (allContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

const getAllContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getContactById = async (id) => {
  const allContacts = await getAllContacts();
  const contact = allContacts.find((contact) => contact.id === id);
  return contact || null;
};

const removeContact = async (id) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [contact] = allContacts.splice(index, 1);
  await updateContactsList(allContacts);
  return contact;
};

const addContact = async (body) => {
  const allContacts = await getAllContacts();

  const newContact = {
    id: nanoid(),
    name: body.name,
    email: body.email,
    phone: body.phone,
  };

  allContacts.push(newContact);
  await updateContactsList(allContacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const allContacts = await getAllContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...body };
  await updateContactsList(allContacts);
  return allContacts[index];
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
