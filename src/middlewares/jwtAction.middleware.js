require('dotenv').config();
import jwt from "jsonwebtoken";



const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;

    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.EXPIRES_TOKEN });
    } catch (err) {
        console.log(">>>err when create jwt (jwtAction)>>", err.message);
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;


    try {
        data = jwt.verify(token, key);
    } catch (err) {
        console.log(err.message);
    }
    return data;

    // jwt.verify(token, key, function (err, decoded) {
    //     if (err) {
    //         console.log(err);
    //         return data;
    //     }
    //     console.log(decoded);
    //     return decoded;
    // })
}

module.exports = {
    createJWT,
    verifyToken
}