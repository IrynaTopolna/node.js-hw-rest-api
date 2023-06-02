// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

const getAllContacts = async () => {
  const allContacts = await Contact.find();
  return allContacts;
};

const getContactById = async (id) => {
  const contact = Contact.findById(id);
  return contact;
};

const removeContact = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  return contact;
};

const addContact = async (body) => {
  const newContact = await Contact.create({
    name: body.name,
    email: body.email,
    phone: body.phone,
    favorite: body.favorite,
  });

  return newContact;
};

const updateContact = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  return contact;
};

const updateContactStatus = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
  return contact;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
