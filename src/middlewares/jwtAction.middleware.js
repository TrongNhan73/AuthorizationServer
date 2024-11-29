require('dotenv').config();
import jwt from "jsonwebtoken";


const nonSecurePaths = ['/login', '/register', '/logout'];

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
        console.log(">>>>Err while verify token" + err.message);
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

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    let cookie = req.cookies;
    if (cookie && cookie.jwt) {
        let decoded = verifyToken(cookie.jwt);
        if (decoded) {
            req.user = decoded;
            req.token = cookie;
            next();
        } else {
            return res.status(401).json({
                EC: '-1',
                EM: 'Not authenticated the user'
            })
        }
    } else {
        return res.status(401).json({
            EC: '-1',
            EM: 'Not authenticated the user'
        })
    }

}



const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') {
        return next();
    }
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.roles.Roles;
        let currentUrl = req.path;
        console.log(currentUrl);
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: '-1',
                EM: `You don't have permission to access this resource`
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess) {
            next();
        } else {
            return res.status(403).json({
                EC: '-1',
                EM: `You don't have permission to access this resource`
            })
        }
    } else {
        return res.status(401).json({
            EC: '-1',
            EM: 'Not authenticated the user'
        })
    }
}
module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermission
}