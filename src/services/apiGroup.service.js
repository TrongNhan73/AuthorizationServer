import db from '../models/index';

const getAllGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [
                ['name', 'ASC']
            ],
            attributes: ["id", "name", "description"],
        });
        return {
            EC: '0',
            EM: 'Successful',
            DT: data
        }
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getAllGroup
}