//import some libraries and function
import { validationResult } from "express-validator";

//this is raised error if input text field are empty
export default (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array().map((err)=>err.msg)
        });
    }
    next();
};