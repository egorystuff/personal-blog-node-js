const Contact = require("../models/contacts");
const createPath = require("../helpers/create-path");

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath("error"), { title: "Error" });
};

const getContacts = (req, res) => {
  const title = "Contacts";
  Contact.find()
    .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
    .catch((error) => handleError(res, error));
};

module.exports = getContacts;
