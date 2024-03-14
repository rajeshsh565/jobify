import { UnAuthenticatedError } from "../Errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtil.js";

export const validateUser = (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        throw new UnAuthenticatedError("invalid login")
    }
    try {
        const {id, role} = verifyToken(token);
        const testUser = id === '65e77a8cfccc7b6b96a9ab02'
        req.user = {id, role, testUser}
        next()
    } catch (error) {
        throw new UnAuthenticatedError("invalid login")
    }
};

