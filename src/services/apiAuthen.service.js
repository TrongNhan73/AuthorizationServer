import { where } from 'sequelize';
import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import { getGroupWithRole } from './jwt.service.js';
import { verifyJWT, createJWT } from "../middlewares/jwtAction.middleware.js";





const hashUserPassword = (prePassword) => {
    const salt = bcrypt.genSaltSync(10);
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
            password: passwordhashed,
            groupId: 5
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


const login = async (rawUserData) => {
    try {
        if (/^\d+$/.test(rawUserData.ephone)) {
            //login with phone number
            let dataUser = await db.User.findOne({
                where: { phone: rawUserData.ephone }
            });
            if (!Boolean(dataUser)) {
                return {
                    EM: 'The phone number is not exist!',
                    EC: '-1',
                    DT: ''
                }
            }
            if (!bcrypt.compareSync(rawUserData.password, dataUser.password)) {
                return {
                    EM: 'The password is wrong!',
                    EC: '-1',
                    DT: ''
                }
            } else {
                return {
                    EM: 'Login success!',
                    EC: '0',
                    DT: dataUser.get({ plain: true })
                }
            }
        } else {
            //login with email
            let dataUser = await db.User.findOne({
                where: { email: rawUserData.ephone }
            });
            if (!Boolean(dataUser)) {
                return {
                    EM: 'The email is not exist!',
                    EC: '-1',
                    DT: ''
                }
            }
            if (!bcrypt.compareSync(rawUserData.password, dataUser.password)) {
                return {
                    EM: 'The password is wrong!',
                    EC: '-1',
                    DT: ''
                }
            } else {
                let roles = await getGroupWithRole(dataUser);
                let payload = {
                    email: dataUser.email,
                    roles,
                    username: dataUser.username
                }
                let token = createJWT(payload);
                return {
                    EM: 'Login success!',
                    EC: '0',
                    DT: {
                        access_token: token,
                        roles,
                        email: dataUser.email,
                        username: dataUser.username
                    }
                }
            }

        }
    } catch (err) {
        console.log(err.message);
        return {
            EM: "Error when login{service}",
            EC: '-1',
            DT: ''
        }
    }
}


module.exports = {
    registerNewUser,
    login
}