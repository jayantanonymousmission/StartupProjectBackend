//import some libraries and functions
import {body} from "express-validator";

//this is used for validation in text field if text are not empty
const registrationValidation=[
    //Name Validator
    body("name")
    .notEmpty().withMessage("Name is Required")
    .isLength({max:30}).withMessage("Name:Max(30) Characters"),

    //password
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({min:6}).withMessage("Address Min(6)")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/).withMessage("Password must contain at least one special character"),

    //body("address")
    body("address")
    .notEmpty().withMessage("Address is Required")
    .isLength({min:5}).withMessage("Address Min(5)")
    .isLength({max:30}).withMessage("Address Max(50) Characters"),

    //gender
     body("gender")
    .notEmpty().withMessage("Gender is Required"),

    //role
    body("role")
    .notEmpty().withMessage("Role is Required"),

    //code
    body("code").custom((value,{req})=>{
        if(req.body.role != "customer" && (!value || value.trim()==""))
            throw new Error("Code is required for non customer roles");
        return true;
    }),
];

export default registrationValidation;