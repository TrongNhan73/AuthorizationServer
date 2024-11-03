import db from '../models/index.js';
import bcrypt from 'bcryptjs';




const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (prePassword) => {
    return bcrypt.hashSync(prePassword, salt);
}


const checkEmailExist = async (email) => {
    const isExist = await db.User.findOne({
        where: { email }
    });
    return Boolean(isExist);
}


const checkPhoneExist = async (phone) => {
    const isExist = await db.User.findOne({
        where: { phone }
    });
    return Boolean(isExist);
}


const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExits = await checkEmailExist(rawUserData.email);
        if (isEmailExits) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phoneNum);
        if (isPhoneExist) {
            return {
                EM: 'The phone number is already exist',
                EC: 1
            }
        }

        let passwordhashed = hashUserPassword(rawUserData.password);
        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phoneNum,
            username: rawUserData.userName,
            password: passwordhashed
        });
        return {
            EM: 'Create user successfully',
            EC: 0
        }
    } catch (e) {
        return {
            EM: e.message,
            EC: -2
        }
    }

}



module.exports = {
    registerNewUser
}