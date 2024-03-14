import { UnAuthorizedError } from "../Errors/customErrors.js"


export const authorizePermissions = (...roles) => {
    return (req, res, next)=>{
        if (!roles.includes(req.user.role))
        {throw new UnAuthorizedError("insufficient access priviledges");}
    next();
    }
}