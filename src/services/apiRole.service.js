import { raw } from 'body-parser';
import db from '../models/index';



const createNewRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url'],
            raw: true
        })

        const persist = roles.filter((ele) => currentRoles.every((e) => e.url !== ele.url));

        if (persist.length === 0) {
            return {
                EM: 'Nothing to create',
                EC: '0',
                DT: persist
            }
        }
        await db.Role.bulkCreate(persist);
        return {
            EM: 'Create role successful ' + persist.length + ' rows',
            EC: '0',
            DT: persist
        }
    } catch (err) {
        console.log('>>>Err in create role(service) ->' + err.message);
        return {
            EM: 'Eror while creating role',
            EC: '-1',
            DT: ''
        }
    }
}


module.exports = {
    createNewRole
}