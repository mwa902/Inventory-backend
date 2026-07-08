import jwt from "jsonwebtoken";


const verifyToken = async(req, res, next) => {
    try{
        const token = req.headers.Authorization.split(' ')[1];
        const isVerified = await jwt.verify(token, process.env.JWT_SECRET);
        if (!isVerified) {
            return new Error(isVerified);
        }
        next();
    } catch (error) {
        console.log('error in verifyToken', error);
        res
            .status(500)
            .json({ error: "Internal server error", message: error.message });
    }
}

export { verifyToken };