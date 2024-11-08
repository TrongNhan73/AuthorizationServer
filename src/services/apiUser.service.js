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
const createUser = async () => {

}
const updateUser = async () => {

}
const deleteUser = async () => {

}
module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}