import { where } from 'sequelize';
import db from '../models/index';
import bcrypt from 'bcryptjs';






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


const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex", "groupId"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });
        if (users) {
            return {
                EC: '0',
                EM: 'success',
                DT: users
            }
        } else {
            return {
                EC: '-1',
                EM: 'Table is not exist',
                DT: []
            }
        }
    } catch (e) {
        console.log(e.message);
        return {
            EC: '-1',
            EM: 'Error when get all users(service)',
            DT: []
        }
    }

}


const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        let data = await db.User.findAndCountAll({
            attributes: ["id", "username", "email", "phone", "sex", "groupId", "address"],
            include: { model: db.Group, attributes: ["name", "description"] },
            offset: offset, limit: limit
        });
        let totalPage = Math.ceil(data.count / limit);
        return {
            EC: '0',
            EM: 'success',
            DT: {
                totalPage,
                totalRows: data.count,
                users: data.rows
            }
        }
    } catch (e) {
        console.log(e.message);
        return {
            EC: '-1',
            EM: 'Error when get users with pagination(service)',
            DT: []
        }
    }
}
const createUser = async (data) => {
    try {
        let password = hashUserPassword(data.password);

        if (await checkEmailExist(data.email)) {
            return {
                EC: '-1',
                EM: 'The email is exist',
                DT: []
            }
        }
        if (await checkPhoneExist(data.phone)) {
            return {
                EC: '-1',
                EM: 'The phone is exist',
                DT: []
            }
        }
        let result = await db.User.create({
            email: data.email,
            phone: data.phone,
            username: data.userName,
            address: data.address,
            sex: data.gender,
            groupId: data.group,
            password
        });
        console.log(result);
        return {
            EC: '0',
            EM: 'Create user successful',
            DT: []
        }

    } catch (e) {
        throw e;
    }

}
const updateUser = async (data) => {
    let user = await db.User.findOne({
        where: { id: data.id }
    })
    if (!user) {
        return {
            EC: '-1',
            EM: 'Can\'t find user',
            DT: []
        }
    } else {

    }
}
const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({ where: { id } });
        if (user) {
            await user.destroy();
            return {
                EC: '0',
                EM: 'Delete successful',
                DT: []
            }
        } else {
            return {
                EC: '-1',
                EM: 'The user is not exist',
                DT: []
            }
        }
    } catch (e) {
        console.log(e.message);
        return {
            EC: '-1',
            EM: 'Error when delete users(service)',
            DT: []
        }
    }
}
module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserWithPagination
}