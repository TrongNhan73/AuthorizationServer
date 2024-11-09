import { where } from 'sequelize';
import db from '../models/index';

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
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
            attributes: ["id", "username", "email", "phone", "sex"],
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
        let result = await db.User.create({

        })
    } catch (e) {

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