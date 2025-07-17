const { body } = require("express-validator");

exports.validateLoad = [
    body("plan").notEmpty().withMessage("Plan is mandatory."),
    body("date").trim().notEmpty().isISO8601().withMessage("Invalid Date | Date is mandatory."),
    body("package").trim().notEmpty().withMessage("Package is mandatory."),
    body("additional").trim().notEmpty().withMessage("Additional is mandatory.")
]

exports.validateUser = [
  body("name").trim().notEmpty().withMessage("First Name is mandatory"),
  body("email").trim().notEmpty().isEmail().withMessage("Invalid Email | Email is mandatory")
];