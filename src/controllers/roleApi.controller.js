import RoleService from '../services/apiRole.service';

const handleGetRole = async (req, res) => {

}
const handleUpdateRole = async (req, res) => {

}
const handleDeleteRole = async (req, res) => {

}
const handleCreateRole = async (req, res) => {
    try {
        let data = await RoleService.createNewRole(req.body);
        return res.send({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (err) {
        console.log('>>>Err in create role(controller) ->' + err.message);

        return res.send({
            EM: 'Eror while creating role',
            EC: '-1',
            DT: ''
        })
    }
}


module.exports = {
    handleGetRole,
    handleUpdateRole,
    handleDeleteRole,
    handleCreateRole
}