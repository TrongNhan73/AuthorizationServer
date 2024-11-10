import db from '../models/index';

const getAllGroup = async () => {
    try {
        let data = await db.Group.findAll();
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