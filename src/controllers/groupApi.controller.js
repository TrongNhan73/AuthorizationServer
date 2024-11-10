import GroupService from '../services/apiGroup.service'
const handleGetAllGroup = async (req, res) => {
    try {
        let data = await GroupService.getAllGroup();
        res.status(200).send({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT
        })

    } catch (e) {
        console.log(e.message);
        res.status(400).send({
            EC: '-1',
            EM: 'Error when get all group(controller)',
            DT: []
        })
    }
}

module.exports = {
    handleGetAllGroup
}