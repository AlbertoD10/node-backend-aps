const { check, validationResult, param } = require("express-validator");

const validateUser = [
  check("username")
    .notEmpty()
    .withMessage("Ingrese un nombre de usuario")
    .not()
    .isEmail()
    .withMessage("El nickname no puede ser un email")
    .trim(),
  check("password")
    .notEmpty()
    .withMessage("Ingrese la contraseña")
    .custom((value, { req }) => value === req.body.repeatpassword)
    .withMessage("Las contraseñas tienen que ser iguales"),
  check("name").notEmpty().withMessage("Ingrese su nombre"),
  check("lastname").notEmpty().withMessage("Ingrese su apellido"),

  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateLogin = [
  check("username").notEmpty().withMessage("Ingrese su nombre de usuario"),
  check("password").notEmpty().withMessage("Ingrese la contraseña"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateId = [
  param("id")
    .notEmpty()
    .withMessage("Ingrese el número del cliente")
    .isInt()
    .withMessage("Formato inválido, debe ser un número"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUser,
  validateLogin,
  validateId,
};
