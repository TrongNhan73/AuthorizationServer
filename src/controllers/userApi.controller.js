import apiUserService from '../services/apiUser.service'
const handleShowUsers = async (req, res) => {
    try {
        let data = await apiUserService.getAllUsers();
        res.status(200).send({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
    } catch (e) {
        console.log(e.message);
        res.status(300).send({
            EC: '-1',
            EM: 'Error when get all users(controller)',
            DT: ''
        })
    }
}
const handleCreateUsers = (req, res) => {
    try {

    } catch (e) {
        console.log(e.message);
        res.status(300).send({
            EC: '-1',
            EM: 'Error when create users(controller)',
            DT: ''
        })
    }

}
const handleUpdateUsers = (req, res) => {
    try {

    } catch (e) {
        console.log(e.message);
        res.status(300).send({
            EC: '-1',
            EM: 'Error when update users(controller)',
            DT: ''
        })
    }
}
const handleDeleteUsers = (req, res) => {
    try {

    } catch (e) {
        console.log(e.message);
        res.status(300).send({
            EC: '-1',
            EM: 'Error when dalete users(controller)',
            DT: ''
        })
    }
}

module.exports = {
    handleShowUsers,
    handleDeleteUsers,
    handleUpdateUsers,
    handleCreateUsers
}