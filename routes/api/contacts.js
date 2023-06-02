const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models");
const { HttpError } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error } = contactAddSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact({
      name,
      email,
      phone,
      favorite,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error } = contactAddSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contactsService.updateContact(id, {
      name,
      email,
      phone,
      favorite,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { error } = contactFavoriteSchema.validate({ favorite });

    if (error) {
      throw HttpError(400, "Missing field favorite");
    }

    const { id } = req.params;
    const result = await contactsService.updateContactStatus(id, { favorite });

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
