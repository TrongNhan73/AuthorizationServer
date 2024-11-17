import apiUserService from '../services/apiUser.service'
const handleShowUsers = async (req, res) => {
    try {
        // let data = await apiUserService.getAllUsers();
        // res.status(200).send({
        //     EC: data.EC,
        //     EM: data.EM,
        //     DT: data.DT
        // })
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await apiUserService.getUserWithPagination(+page, +limit);
            res.status(200).send({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT
            })
        } else {
            res.status(300).send({
                EC: '-1',
                EM: 'Missing params',
                DT: ''
            })
        }

    } catch (e) {
        console.log(e.message);
        res.status(300).send({
            EC: '-1',
            EM: 'Error when get all users(controller)',
            DT: ''
        })
    }
}
const handleCreateUsers = async (req, res) => {
    try {
        console.log(req.body);
        if ((req.body.email || req.body.phone) && req.body.address && req.body.gender !== undefined && req.body.group !== undefined && req.body.userName && req.body.password) {
            return res.status(200).send(await apiUserService.createUser(req.body))


        } else {
            return res.status(200).json({
                EM: 'Missing required parameter',//error message
                EC: '1',//error code
                DT: ''//data
            });
        }
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
const handleDeleteUsers = async (req, res) => {
    try {
        let data = await apiUserService.deleteUser(req.body.id);
        res.status(200).send({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })
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